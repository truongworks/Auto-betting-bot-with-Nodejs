<?php
  ob_start();
  if (!isset($_SESSION)) {
    session_start();
  }
  require_once "common/connect.inc.php";
  require_once "common/sysenv.php";
  //
  if(isset($_GET['deleteComment']) && $_GET['deleteComment'] !="" && isset($_GET['idDelBet']) && $_GET['idDelBet'] !=""){
    $idDelBet = $_GET['idDelBet'];
    // get ngày giờ hiện tại khi update
    date_default_timezone_set('Asia/Ho_Chi_Minh');
    $timestamp = date('Y-m-d H:i:s');
    $stmt_del_bet = $conn->prepare($getSQL['uDelBetById']);
    $stmt_del_bet->bindParam(":id", $idDelBet);
    $stmt_del_bet->bindParam(":timestamp", $timestamp);
    $stmt_del_bet->execute();
    $stmt_del_bet->closeCursor();
    header('location: dashboard-bets.php');exit();
  }
?>
<!doctype html>
<html lang="en">

<head>
  <?php include "includes/header_css.php"; ?>
</head>

<body class="vertical light">
  <div class="wrapper">
    <?php include "includes/header.php"; ?>
    <div class="tab-content py-0 px-3 px-sm-0 background-all-content" id="nav-tabContent">
      <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
        <main role="main" class="main-content">
          <div class="container-fluid">
            <div class="row justify-content-center">
              <div class="col-12">
                <!-- .row -->
                <div class="row">
                  <!-- Recent Activity -->
                  <?php include "includes/sidebar.php"; ?>
                  
                  <div class="col-md-12 col-lg-9 mb-4 right-main-content">
                  <div class="d-inline-flex align-items-center justify-content-start py-2 pr-3 toggle-sidebar-btn" style="cursor:pointer">
                      <i class="fe fe-chevron-left"></i>
                      <span class="toggle-btn-text mr-1">Thu gọn</span>sidebar
                    </div>
                    <div class="d-none">
                      <div class="card-head text-center">
                        <h1>
                          LIGA MX BETTING <span class="custom-title-head">ODDS</span>
                        </h1>
                      </div>
                      <div class="row mb-3">
                        <div class="col-md-12 col-lg-2"></div>
                        <div class="col-md-12 col-lg-4">
                          <select class="select-option" id="example-select">
                            <option>Mexico</option>
                            <option>Mexico</option>
                            <option>Mexico</option>
                            <option>Mexico</option>
                          </select>
                        </div>
                        <div class="col-md-12 col-lg-4">
                          <select class="select-option" id="example-select">
                            <option>Liga MX</option>
                            <option>Liga MX</option>
                            <option>Liga MX</option>
                            <option>Liga MX</option>
                          </select>
                        </div>
                        <div class="col-md-12 col-lg-2"></div>
                      </div>
                      <div class="col-md-4 col-lg-4 pd-0">
                        <nav class="soccer-nav-tabs">
                          <div class="nav soccer-nav-tabs soccer-nav-fill justify-content-left" id="nav-tab"
                            role="tablist">
                            <a class="soccer-nav-item soccer-nav-link active" id="nav-home-tab" data-toggle="tab"
                              href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">
                              <img src="assets/images/soccer-ball.png" width="25px" class="mr-2">Bóng đá</a>
                          </div>
                        </nav>
                      </div>
                    </div>
                    <?php
                      if(isset($_GET['editComment']) && $_GET['editComment'] !="" && isset($_GET['idEditBet']) && $_GET['idEditBet'] !=""){
                        $idEditBet = $_GET['idEditBet'];
                        // get ngày giờ hiện tại khi update
                        date_default_timezone_set('Asia/Ho_Chi_Minh');
                        $timestampEdit = date('Y-m-d H:i:s');
                        $stmt_edit_bet = $conn->prepare($getSQL['gEditBetById']);
                        $stmt_edit_bet->bindParam(":id", $idEditBet);
                        $stmt_edit_bet->execute();
                        $result_edit_bet = $stmt_edit_bet->fetch(PDO::FETCH_ASSOC);
                        $stmt_edit_bet->closeCursor();
                        if($_SERVER['REQUEST_METHOD'] == 'POST'){
                          $messageSave = "";
                          $usernameEdit = $_POST['usernameEdit'];
                          $passwordEdit = $_POST['passwordEdit'];
                          $stmt_edit_update_bet = $conn->prepare($getSQL['uEditBetById']);
                          $stmt_edit_update_bet->bindParam(":username", $usernameEdit);
                          $stmt_edit_update_bet->bindParam(":password", $passwordEdit);
                          $stmt_edit_update_bet->bindParam(":timestamp", $timestampEdit);
                          $stmt_edit_update_bet->bindParam(":id", $idEditBet);
                          if($stmt_edit_update_bet->execute()){
                            header("Location: dashboard-bets.php");exit();
                          } else {
                            $messageSave = "Lưu thất bại";
                          }
                          $stmt_edit_update_bet->closeCursor();
                        }
                    ?>
                    <form method="POST">
                      <?php
                        if(isset($messageSave)){echo "<h6 class='text-center text-danger msg-text'>".$messageSave."</h6>";}
                        if(isset($messageSaveSuccess)){echo "<h6 class='text-center text-success msg-text'>".$messageSaveSuccess."</h6>";}
                      ?>
                      <div class="row">
                        <div class="col-md-12 col-md-12">
                          <h6 class="text-uppercase text-dark font-weight-bold mb-3">Chỉnh sửa tài khoản: <label class="text-danger"><?php echo $result_edit_bet['botname']; ?></label></h6>
                        </div>
                        <div class="col-lg-6 col-md-6">
                          <label>Tên đăng nhập</label>
                          <input type="text" name="usernameEdit" class="form-control" value="<?php echo $result_edit_bet["username"]; ?>">
                        </div>
                        <div class="col-lg-6 col-md-6">
                          <label>Mật khẩu</label>
                          <input type="password" name="passwordEdit" class="form-control">
                        </div>
                        <div class="col-lg-12 col-md-12 mt-3">
                          <button class="btn btn-success text-white" name="saveEditBet" value="saveEditBet">Lưu</button>
                          <a href="dashboard-bets.php" class="btn btn-danger">Quay Lại</a>
                        </div>
                      </div>
                    </form>
                    <?php
                      } elseif(isset($_GET['editAmountBet']) && $_GET['editAmountBet'] !="" && isset($_GET['idEditAmountBet']) && $_GET['idEditAmountBet'] !=""){
                        $idEditAmountBet = $_GET['idEditAmountBet'];
                        // get ngày giờ hiện tại khi update
                        date_default_timezone_set('Asia/Ho_Chi_Minh');
                        $timestampAmountEdit = date('Y-m-d H:i:s');
                        $stmt_edit_amount_bet = $conn->prepare($getSQL['gEditBetById']);
                        $stmt_edit_amount_bet->bindParam(":id", $idEditAmountBet);
                        $stmt_edit_amount_bet->execute();
                        $result_edit_amount_bet = $stmt_edit_amount_bet->fetch(PDO::FETCH_ASSOC);
                        $stmt_edit_amount_bet->closeCursor();
                        if($_SERVER['REQUEST_METHOD'] == 'POST'){
                          $messageSave = "";
                          $amountMain = $_POST['amountMain'];
                          $amount = $_POST['amount'];
                          $stmt_edit_update_bet = $conn->prepare($getSQL['uEditAmountBetById']);
                          $stmt_edit_update_bet->bindParam(":amount_min", $amountMain);
                          $stmt_edit_update_bet->bindParam(":amount", $amount);
                          $stmt_edit_update_bet->bindParam(":timestamp", $timestampAmountEdit);
                          $stmt_edit_update_bet->bindParam(":id", $idEditAmountBet);
                          if($stmt_edit_update_bet->execute()){
                            header("Location: dashboard-bets.php");exit();
                          } else {
                            $messageSave = "Lưu thất bại";
                          }
                          $stmt_edit_update_bet->closeCursor();
                        }
                    ?>
                    <form method="POST">
                      <?php
                        if(isset($messageSave)){echo "<h6 class='text-center text-danger msg-text'>".$messageSave."</h6>";}
                        if(isset($messageSaveSuccess)){echo "<h6 class='text-center text-success msg-text'>".$messageSaveSuccess."</h6>";}
                      ?>
                      <div class="row">
                        <div class="col-md-12 col-md-12">
                          <h6 class="text-uppercase text-dark font-weight-bold mb-3">Chỉnh sửa tiền cược tài khoản: <label class="text-danger"><?php echo $result_edit_amount_bet['botname']; ?></label></h6>
                        </div>
                        <div class="col-lg-6 col-md-6">
                          <label>Số tiền đánh tối thiểu ($)</label>
                          <input type="number" name="amountMain" class="form-control" value="<?php echo $result_edit_amount_bet["amount_min"]; ?>">
                        </div>
                        <div class="col-lg-6 col-md-6">
                          <label>Số tiền muốn đánh ($)</label>
                          <input type="number" name="amount" class="form-control" value="<?php echo $result_edit_amount_bet["amount"]; ?>">
                        </div>
                        <div class="col-lg-12 col-md-12 mt-3">
                          <button class="btn btn-success text-white" name="saveEditAmountBet" value="saveEditAmountBet">Lưu</button>
                          <a href="dashboard-bets.php" class="btn btn-danger">Quay Lại</a>
                        </div>
                      </div>
                    </form>
                    <?php
                      } else {
                    ?>
                    <div class="tab-content py-0 px-3 px-sm-0 background-all-content table-soccer" id="nav-tabContent"
                      style="overflow-x: auto;">
                      <div class="tab-pane fade show active" id="nav-home" role="tabpanel"
                        aria-labelledby="nav-home-tab">
                        <!-- table -->
                        <table class="table table-hover">
                          <thead class="thead-dark">
                            <tr>
                              <th class="text-center font-title text-uppercase nowrap-text">Bets</th>
                              <th class="text-center font-title text-uppercase nowrap-text">Tên đăng nhập</th>
                              <th class="text-center font-title text-uppercase nowrap-text">Mật khẩu</th>
                              <th class="text-center font-title text-uppercase nowrap-text">Số tiền đánh tối thiểu ($)</th>
                              <th class="text-center font-title text-uppercase nowrap-text">Số tiền muốn đánh ($)</th>
                              <th class="text-center font-title text-uppercase nowrap-text thaotac">Thao tác</th>
                            </tr>
                          </thead>
                          <tbody>
                            <?php
                              $stmt = $conn->prepare($getSQL['glistbot']);
                              $stmt->execute();
                              $listbot = $stmt->fetchAll(PDO::FETCH_ASSOC);
                              $stmt->closeCursor();
                              foreach ($listbot as $item) {
                            ?>
                             <tr class="accordion-toggle collapsed tr-custom-table" id="c-2474" data-toggle="collapse" data-parent="#c-2474" href="#collap-2474">
                               <td class="text-left nowrap-text text-danger text-uppercase font-weight-bold"><?php echo $item['botname']; ?></td>
                               <td class="nowrap-text text-center"><?php echo $item['username']; ?></td>
                               <td class="nowrap-text text-center custom-td-bets"><?php echo $item['password']; ?></td>
                               <td class="nowrap-text text-center"><?php echo $item['amount_min']; ?></td>
                               <td class="nowrap-text text-center"><?php echo $item['amount']; ?></td>
                               <td class="nowrap-text text-center custom-td-bets">
                                <a onclick="return confirm('Bạn có muốn cập nhật tiền cược của tài khoản <?php echo $item['botname']; ?> ?')" href="dashboard-bets.php?editAmountBet=editAmountBet&idEditAmountBet=<?php echo $item['id']; ?>"><button type="button" class="btn btn-primary mr-2 mb-1">Cập nhật tiền cược</button></a>
                                <a onclick="return confirm('Bạn có muốn sửa tài khoản <?php echo $item['botname']; ?> ?')" href="dashboard-bets.php?editComment=editComment&idEditBet=<?php echo $item['id']; ?>"><button type="button" class="btn btn-warning text-white mr-2 mb-1">Sửa</button></a>
                                <a onclick="return confirm('Bạn có chắc chắn muốn xoá tài khoản <?php echo $item['botname']; ?> ?')" href="dashboard-bets.php?deleteComment=deleteComment&idDelBet=<?php echo $item['id']; ?>"><button type="button" class="btn btn-danger mb-1">Xóa</button></a>
                              </td>
                             </tr>
                            <?php
                              }
                            ?>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <?php
                      }
                    ?>
                  </div>
                </div> <!-- .row -->
              </div> <!-- .container-fluid -->
          <?php include "includes/menu.php"; ?>
        </main>

      </div>

    <!-- main -->
    </div> <!-- .wrapper -->
    <script src="js/jquery.min.js"></script>
    <script src="js/popper.min.js"></script>
    <script src="js/moment.min.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/simplebar.min.js"></script>
    <script src='js/daterangepicker.js'></script>
    <script src='js/jquery.stickOnScroll.js'></script>
    <script src="js/tinycolor-min.js"></script>
    <script src="js/config.js"></script>
    <script src="js/d3.min.js"></script>
    <script src="js/topojson.min.js"></script>
    <script src="js/datamaps.all.min.js"></script>
    <script src="js/datamaps-zoomto.js"></script>
    <script src="js/datamaps.custom.js"></script>
    <script src="js/Chart.min.js"></script>
    <script>
      /* defind global options */
      Chart.defaults.global.defaultFontFamily = base.defaultFontFamily;
      Chart.defaults.global.defaultFontColor = colors.mutedColor;
    </script>
    <script src="js/gauge.min.js"></script>
    <script src="js/jquery.sparkline.min.js"></script>
    <script src="js/apexcharts.min.js"></script>
    <script src="js/apexcharts.custom.js"></script>
    <script src='js/jquery.mask.min.js'></script>
    <script src='js/select2.min.js'></script>
    <script src='js/jquery.steps.min.js'></script>
    <script src='js/jquery.validate.min.js'></script>
    <script src='js/jquery.timepicker.js'></script>
    <script src='js/dropzone.min.js'></script>
    <script src='js/uppy.min.js'></script>
    <script src='js/quill.min.js'></script>
    <script src='js/custom.js'></script>
    <script>
      $(document).ready(function () {
        $(".left-header").click(function () {
          $(".custom-ul-dropdown").slideToggle();
        });
      });
      $(document).ready(function () {
        $('[data-toggle="tooltip"]').tooltip();
      });
    </script>
    <script>
      $(document).ready(function () {
        $('[data-toggle="tooltip"]').tooltip();
      });
    </script>
    <script>
      // $(document).ready(function() {
      //       $('home.htmlshorcut-menu').click(function() {
      //           $('.squircle').addClass('.modal-best');
      //           $('.squircle').removeClass('.modal-shortcut');
      //       });
      //   });
      // $( ".align-self-center" ).even().removeClass( "modal-shortcut-menu" );
    </script>
    <script>
      $('.select2').select2(
        {
          theme: 'bootstrap4',
        });
      $('.select2-multi').select2(
        {
          multiple: true,
          theme: 'bootstrap4',
        });
      $('.drgpicker').daterangepicker(
        {
          singleDatePicker: true,
          timePicker: false,
          showDropdowns: true,
          locale:
          {
            format: 'MM/DD/YYYY'
          }
        });
      $('.time-input').timepicker(
        {
          'scrollDefault': 'now',
          'zindex': '9999' /* fix modal open */
        });
      /** date range picker */
      if ($('.datetimes').length) {
        $('.datetimes').daterangepicker(
          {
            timePicker: true,
            startDate: moment().startOf('hour'),
            endDate: moment().startOf('hour').add(32, 'hour'),
            locale:
            {
              format: 'M/DD hh:mm A'
            }
          });
      }
      var start = moment().subtract(29, 'days');
      var end = moment();

      function cb(start, end) {
        $('home.htmlreportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
      }
      $('home.htmlreportrange').daterangepicker(
        {
          startDate: start,
          endDate: end,
          ranges:
          {
            'Today': [moment(), moment()],
            'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
            'Last 7 Days': [moment().subtract(6, 'days'), moment()],
            'Last 30 Days': [moment().subtract(29, 'days'), moment()],
            'This Month': [moment().startOf('month'), moment().endOf('month')],
            'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
          }
        }, cb);
      cb(start, end);
      $('.input-placeholder').mask("00/00/0000",
        {
          placeholder: "__/__/____"
        });
      $('.input-zip').mask('00000-000',
        {
          placeholder: "____-___"
        });
      $('.input-money').mask("home.html.home.htmlhome.html0,00",
        {
          reverse: true
        });
      $('.input-phoneus').mask('(000) 000-0000');
      $('.input-mixed').mask('AAA 000-S0S');
      $('.input-ip').mask('0ZZ.0ZZ.0ZZ.0ZZ',
        {
          translation:
          {
            'Z':
            {
              pattern: /[0-9]/,
              optional: true
            }
          },
          placeholder: "___.___.___.___"
        });
      // editor
      var editor = document.getElementById('editor');
      if (editor) {
        var toolbarOptions = [
          [
            {
              'font': []
            }],
          [
            {
              'header': [1, 2, 3, 4, 5, 6, false]
            }],
          ['bold', 'italic', 'underline', 'strike'],
          ['blockquote', 'code-block'],
          [
            {
              'header': 1
            },
            {
              'header': 2
            }],
          [
            {
              'list': 'ordered'
            },
            {
              'list': 'bullet'
            }],
          [
            {
              'script': 'sub'
            },
            {
              'script': 'super'
            }],
          [
            {
              'indent': '-1'
            },
            {
              'indent': '+1'
            }], // outdent/indent
          [
            {
              'direction': 'rtl'
            }], // text direction
          [
            {
              'color': []
            },
            {
              'background': []
            }], // dropdown with defaults from theme
          [
            {
              'align': []
            }],
          ['clean'] // remove formatting button
        ];
        var quill = new Quill(editor,
          {
            modules:
            {
              toolbar: toolbarOptions
            },
            theme: 'snow'
          });
      }
      // Example starter JavaScript for disabling form submissions if there are invalid fields
      (function () {
        'use strict';
        window.addEventListener('load', function () {
          // Fetch all the forms we want to apply custom Bootstrap validation styles to
          var forms = document.getElementsByClassName('needs-validation');
          // Loop over them and prevent submission
          var validation = Array.prototype.filter.call(forms, function (form) {
            form.addEventListener('submit', function (event) {
              if (form.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
              }
              form.classList.add('was-validated');
            }, false);
          });
        }, false);
      })();
    </script>
    <script src="js/apps.js"></script>
    <script>
      $(document).ready(function(){
        //xem thêm lịch sử giao dịch
        $(".see-more").click(function () {
          var page = $(".pageNum").val();
          console.log(page);
          $.ajax({
            type: 'post',
            data: { page },
            url: "./common/transactionbet.php",
            success: function (res) {
              $(".listTransaction").append(res)
              $(".pageNum").val(Number(page) + 1)
            }
          })
          var data_param = {
            limit: 10,
            offset: Number(page) * 10,
            func: 'gTransactionBet',
          }
          //check số lượng phan trang
          $.ajax({
            type: "get",
            url: "common/get.php",
            data: data_param,
            success: function (res) {
              if (res.length < 10) {
                $(".see-more").addClass('d-none');
                $(".see-hide").removeClass('d-none');
              }
            }
          })
        })
        $(".see-hide").click(function () {
          $.ajax({
            type: 'post',
            data: { page: 0 },
            url: "./common/transactionbet.php",
            success: function (res) {
              $(".listTransaction").html(res)
              $(".pageNum").val(1)
              $(".see-hide").addClass('d-none')
              $(".see-more").removeClass('d-none');
            }
          })
        })
      });
    </script>
</body>

</html>
<?php ob_flush(); ?>