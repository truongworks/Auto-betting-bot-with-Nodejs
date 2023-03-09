<?php
  if(!isset($_SESSION)){
    session_start();
  }
  require_once "common/connect.inc.php";
  require_once "common/sysenv.php";

  if($_SERVER["REQUEST_METHOD"] == "POST"){
    if(isset($_POST["login"])){
      $message = "";
      $username = $_POST["username"];
      $password = $_POST["password"];
      // $a_check = ((isset($_POST['remember_me']) != 0) ? 1 : "");

      $LoginSuccess = "home.php";
      if($username == ""){
        $message = "Vui lòng nhập tài khoản";
      }else  if($password == ""){
        $message = "Vui lòng nhập mật khẩu";
      }else if($message == ""){
        try{
          $stmt = $conn -> prepare($getSQL["gAdmin"]);
          $stmt -> execute(array(
            ":username" => $username
          ));
          $data = $stmt -> fetch(PDO::FETCH_ASSOC);
          if($data == false){
            $message = "Tài khoản không tồn tại";
          } else {
            if($password == $data["password"]){
              $userData = array(
                "id"          => $data["id"],
                "username"    => $data["username"],
                "fullname"    => $data["fullname"],
                "email" 	    => $data["email"],
                "role"        => $data["role"],
              );
              $_SESSION["userData"] = $userData;
              header("Location: ". $LoginSuccess);
            } else {
              $message = "Mật khẩu không chính xác";
            }
          }
        } catch(PDOException $e){
          $message = $e->getMessage();
        }
      }
    }
  }
?>
<!doctype html>
<html lang="en">

<head>
  <?php include "includes/header_css.php"; ?>
</head>

<body class="light ">
  <div class="wrapper vh-100">
    <div class="row align-items-center h-100">
      <form class="col-lg-3 col-md-4 col-10 mx-auto text-center custom-login-form" method="POST" action="">
        <img src="assets/images/Logo_original.svg" width="150px">
        <h1 class="h6 mb-3">ĐĂNG NHẬP</h1>
        <div class="form-group">
          <label for="inputEmail" class="sr-only">Tài khoản</label>
          <input type="text" class="form-control form-control-lg" placeholder="Tài khoản" name="username" value="<?php if (isset($_POST['username'])) echo $_POST['username']; ?>">
        </div>
        <div class="form-group">
          <label for="inputPassword" class="sr-only">Mật khẩu</label>
          <input type="password" class="form-control form-control-lg" placeholder="Mật khẩu" name="password" value="<?php if (isset($_POST['password'])) echo $_POST['password']; ?>">
        </div>
        <!-- <div class="checkbox mb-3 remember_me">
          <label>
            <input type="checkbox" value="1" name="remember_me" id="remember_me"> Nhớ mật khẩu </label>
        </div> -->
        <button class="btn btn-lg btn-danger btn-block" type="submit" name="login" value="login">Đăng nhập</button>
        <p class="mt-5 mb-3 text-muted">RedBolt 2022</p>
        <div class="text-center">
          <?php if (isset($message)) {
            echo "<h5 style='color:red;'>" . "<i class='fa fa-warning mr-2 mb-2'></i>" . $message . "</h5>";
          } ?>
        </div>
      </form>
    </div>
  </div>
  <script src="js/jquery.min.js"></script>
  <script src="js/popper.min.js"></script>
  <script src="js/moment.min.js"></script>
  <script src="js/bootstrap.min.js"></script>
  <script src="js/simplebar.min.js"></script>
  <script src='js/daterangepicker.js'></script>
  <script src='js/jquery.stickOnScroll.js'></script>
  <script src="js/tinycolor-min.js"></script>
  <!-- <script src="js/config.js"></script> -->
  <!-- <script src="js/apps.js"></script> -->
  <script>
    $(document).ready(function () {
      
      // $('.remember_me').click(function() {
      //   var isCheck = $('#remember_me').is(':checked');
      //   alert(isCheck);

      // });

    });
  </script>
</body>

</html>
</body>

</html>