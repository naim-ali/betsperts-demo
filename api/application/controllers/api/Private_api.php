<?php

header("Access-Control-Allow-Origin: *");
defined('BASEPATH') OR exit('No direct script access allowed');
require APPPATH . '/libraries/REST_Controller.php';

class Private_api extends REST_Controller {

    function __construct()
    {
        // Construct the parent class
        parent::__construct();
    }


    /*
	|--------------------------------------------------------------------------
	| auth user
	|--------------------------------------------------------------------------
	|
	| Output:  user 
	| Action: POST
	|
	|__________________________________________________________________________
	*/
	public function signup_post() {

		$this->load->model("User_model");

		$username = $this->post('username');
		$email = $this->post('email');
		$password = $this->post('password');
		$country = $this->post('country');
		$state = $this->post('state');

		$salt = "8dC_9Kl?";
		$encrypted = md5($password . $salt);


    	// If has an image to be uploaded
        if($_FILES)
        {


			//only gif, png, jpg formated images
			//are permitted
			//----------------------------------
			$allowed = array('png' ,'jpg');
			if(!in_array(strtolower(pathinfo($_FILES['user']['name'], PATHINFO_EXTENSION)),$allowed))
			{
				$response = array
		        (
			        "status" => "failure",
			        "results" => null,
			        "message" => "image must be a jpg or png"
		        );
				//$this->response_error('Error, File format not permitted');
			}


		    //normally we'd be sending the image to s3
		    //-------------------------------------------------
        }

		$uid = $this->User_model->create_user($username, $email, $encrypted, $country, $state);
	
	    $response = array
        (
	        "status" => "success",
	        "results" => $uid,
	        "message" => ""
		);
		$this->set_response($response, REST_Controller::HTTP_OK);
	}
	
	//Get a user
    public function signin_get()
    {

		$this->load->model("User_model");
		$cred = $this->get('credential');
		$password = $this->get('password');
		$salt = "8dC_9Kl?";

		$encrypted = md5($password . $salt);

        if ($cred === NULL)
        {
            $this->response_error();
        }

        $user = $this->User_model->fetch_user($cred, $encrypted);

        $response = array
        (
	        "results" => $user[0] ? $user : "no user found",
            "type" => "user_data"
        );

        $this->set_response($response, REST_Controller::HTTP_OK);
	}
	
	public function countries_get(){
		$curl = curl_init();
		curl_setopt($curl, CURLOPT_URL, 'https://parseapi.back4app.com/classes/Continentscountriescities_Country?order=name&keys=name,code');
		curl_setopt($curl, CURLOPT_HTTPHEADER, array(
			'X-Parse-Application-Id: hLFlEP7gLLVkIpxNylAJpeDFqkOJdXnc5oN3ykpY', // This is your app's application id
			'X-Parse-REST-API-Key: KUzCTfbQalSo7RM56bgWYGFJnGLGGAnRseQzMH9k' // This is your app's REST API key
		));
		$data = json_decode(curl_exec($curl)); // Here you have the data that you need
    print_r(json_encode($data, JSON_PRETTY_PRINT), 1);
    curl_close($curl);
	}

	public function states_get(){
		$code = $this->get('code');
		$curl = curl_init();
        $where = urlencode('{
            "Country_Code": "'.$code.'"
        }');
		curl_setopt($curl, CURLOPT_URL, 'https://parseapi.back4app.com/classes/Continentscountriescities_Subdivisions_States_Provinces?order=Subdivision_Name&excludeKeys=country,Subdivion_Type&where=' . $where);
		curl_setopt($curl, CURLOPT_HTTPHEADER, array(
			'X-Parse-Application-Id: hLFlEP7gLLVkIpxNylAJpeDFqkOJdXnc5oN3ykpY', // This is your app's application id
			'X-Parse-REST-API-Key: KUzCTfbQalSo7RM56bgWYGFJnGLGGAnRseQzMH9k' // This is your app's REST API key
		));
		$data = json_decode(curl_exec($curl)); // Here you have the data that you need
    print_r(json_encode($data, JSON_PRETTY_PRINT),1);
    curl_close($curl);
	}
}
