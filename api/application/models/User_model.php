<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class User_model extends CI_Model
{
    public function __construct() 
    {
        parent::__construct();
    }
    
    
    //------------------------------------------------------
   // add a new user
   public function create_user($username, $email, $encrypted, $country, $state)
   {
	   
	   $sql = "INSERT INTO User (username, email, password, country, state)
	           VALUES(:username, :email, :password, :country, :state)";
					
	   $stmt = $this->db->conn_id->prepare($sql);
	   $stmt->execute
	                (
	                    array
	                    (
						    "username" => $username,
						    "email" => $email,
							"password" => $encrypted,
							"country" => $country,
							"state" => $state
	                    )
	                );
	                
	    $inserted_user_id = $this->db->conn_id->lastInsertId();
	    return $inserted_user_id;
    } 



    public function fetch_user($cred, $password)
    {
		
    	$sql = "SELECT u.*
				FROM User AS u
				WHERE u.username = :username OR u.email = :email AND u.password = :password";
        $stmt = $this->db->conn_id->prepare($sql);
        $stmt->execute(array('username' => $cred, 'email' => $cred, 'password' => $password));

        return $stmt->fetchAll(PDO::FETCH_ASSOC);

    }

}
