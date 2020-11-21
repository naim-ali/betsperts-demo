<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Api_test extends CI_Controller
{

	public function __construct()
	{
        parent:: __construct();
    }

    public function curl()
    {

	    //Private api
	    //------------
	    $articles_by_influencer = base_url()."/index.php/api/Private_api/posts_by_artist/artist_id/26/user_id/8/start/0/limit/2";
	    $articles_by_subscription = base_url()."/index.php/api/Private_api/articles_by_subscription/user_id/1";
	    $articles_by_like = base_url()."/index.php/api/Private_api/articles_by_like/user_id/1";
	    $search_influencers = base_url()."/index.php/api/Private_api/search_influencers/user_id/1/influencer_name/gra";
	    $influencers_by_subscription = base_url()."/index.php/api/Private_api/influencers_by_subscription/user_id/1574";
	    $trending_articles = base_url()."/index.php/api/Private_api/trending_articles/user_id/1";
	    $like_article = base_url()."/index.php/api/Private_api/like_article";
	    $subscribe_influencer = base_url()."/index.php/api/Private_api/subscribe_influencer";
	    $add_comment = base_url()."/index.php/api/Private_api/comment";
	    $register_user = base_url()."/index.php/api/Private_api/register_user";

	    $set_post_tags = base_url()."/index.php/api/Private_api/set_post_tags";
	    $set_user_tags = base_url()."/index.php/api/Private_api/set_user_tags";


	    //Internal api
	    //-------------
	    $edit_article_title = base_url()."/index.php/api/Internal_api/edit_article_title";
	    $edit_article_content = base_url()."/index.php/api/Internal_api/edit_article_content";
	    $validate_article = base_url()."/index.php/api/Internal_api/validate_article";
	    $delete_article = base_url()."/index.php/api/Internal_api/delete_article";
		$add_influencer = base_url()."/index.php/api/Internal_api/add_influencer";
		$add_post = base_url()."/index.php/api/Internal_api/add";


	    //URL Curl
	    //-------------
	    $curl_handle = curl_init() or die(curl_error());
		curl_setopt($curl_handle, CURLOPT_URL, $add_post);
		curl_setopt($curl_handle, CURLOPT_RETURNTRANSFER, 1);

		$tags = array(20,21);

		$field_string = http_build_query($tags);


		curl_setopt($curl_handle, CURLOPT_POSTFIELDS, array(
			 'artist_id' => "218",
			 'sc_url' => "https%3A%2F%2Fsoundcloud.com%2Fchubba50s%2F10-cellphones-ft-kupreme"
	    ));


		$buffer=curl_exec($curl_handle) or die(curl_error());
		$result = json_decode($buffer);
		if (is_null($result))
		{
		   die("Json decoding failed with error: ". json_last_error());
		}
		echo "<pre>";
		var_dump($result);
		echo "</pre>";
		echo curl_error($curl_handle);
		curl_close($curl_handle);
    }
}
