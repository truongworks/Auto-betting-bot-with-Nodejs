<?php
ob_start();
if (!isset($_SESSION)) {
  session_start();
}
require_once "common/connect.inc.php";
require_once "common/sysenv.php";
?>
<!doctype html>
<html lang="en">

<head>
  <?php include "includes/header_css.php"; ?>
  <style>
    .loading-div {
      display: none;
    }
  </style>
</head>

<body class="vertical light">

  <div class="loading-div">
    <div class="position-fixed h-100 w-100 d-flex"
      style="background:rgba(0,0,0,0.5);z-index:99;left:0;right:0;bottom:0;">
      <img src="./assets/images/loader-over.svg" class="img-fluid m-auto" />
    </div>
  </div>

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
                    <div class="d-inline-flex align-items-center justify-content-start py-2 pr-3 toggle-sidebar-btn"
                      style="cursor:pointer">
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
                              <img src="assets/images/soccer-ball.png" width="25px" class="mr-2">Bóng đá
                            </a>
                          </div>
                        </nav>
                      </div>
                    </div>
                    <div class="tab-content py-0 px-3 px-sm-0 background-all-content table-soccer" id="nav-tabContent"
                      style="overflow-x: auto;">
                      <div class="tab-pane fade show active" id="nav-home" role="tabpanel"
                        aria-labelledby="nav-home-tab">
                        <!-- table -->
                        <table class="table table-hover">
                          <thead class="thead-dark">
                            <tr>
                              <th class="text-center font-title text-uppercase nowrap-text font-title">Ngày Giờ</th>
                              <th class="text-center font-title text-uppercase nowrap-text font-title">Trận</th>
                              <?php
                              $stmt = $conn->prepare($getSQL['glistbot']);
                              $stmt->execute();
                              $listbot = $stmt->fetchAll(PDO::FETCH_ASSOC);
                              $stmt->closeCursor();
                              foreach ($listbot as $item) {
                                ?>
                                <th class="text-center font-title text-uppercase nowrap-text font-title"><?php echo $item['botname']; ?></th>
                              <?php
                              }
                              ?>
                            </tr>
                          </thead>
                          <tbody>
                            <?php
                            $stt = 1;
                            $stmt = $conn->prepare($getSQL["gAllCrawHistory"]);
                            $stmt->execute();
                            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
                            $stmt->closeCursor();
                            foreach ($result as $item) {
                              $game = explode('/', $item['game']);
                              $datetime = substr($item['date_event'], 0, strpos($item['date_event'], '-'));
                              $datetime = date('d-m-Y H:i:s', strtotime($datetime));
                              $date = substr($datetime, 0, 10);
                              $time = substr($datetime, 11, 20);

                              // //10stack
                              // $stmt1 = $conn->prepare($getSQL["gAllCrawHistoryById"]);
                              // $stmt1->bindValue(":id", 13);
                              // $stmt1->execute();
                              // $result1 = $stmt1->fetchAll();
                              // $stmt1->closeCursor();
                            
                              // //betwwin
                              // $stmt2 = $conn->prepare($getSQL["gAllCrawHistoryById"]);
                              // $stmt2->bindValue(":id", 14);
                              // $stmt2->execute();
                              // $result2 = $stmt2->fetchAll();
                              // $stmt2->closeCursor()
                              ?>
                              <tr class="accordion-toggle collapsed tr-custom-table" id="c-2474" data-toggle="collapse"
                                data-parent="#c-2474" href="#collap-2474">
                                <td class="text-center nowrap-text" style="min-width: 130px;">
                                  <?php echo $date; ?><br><?php echo $time; ?>
                                </td>
                                <td class="nowrap-text text-center row custom-td-battle background-all-td">
                                  <div class="col-5">
                                    <!-- <img src="assets/images/Manchester-United-logo.png" width="50px"> -->
                                    <div class="team-name text-center mt-2" style="line-height:1.2; white-space: normal;">
                                      <?php echo $game[0]; ?>
                                    </div>
                                  </div>
                                  <div class="col-2" style="line-height: 65px; font-weight: bold;">VS</div>
                                  <div class="col-5">
                                    <!-- <img src="assets/images/chelse.png" width="50px"> -->
                                    <div class="team-name text-center mt-2" style="line-height:1.2; white-space: normal;">
                                      <?php echo $game[1]; ?></div>
                                  </div>
                                </td>
                                <?php
                                foreach ($listbot as $bot) {
                                  if ($bot['id'] == 2) {
                                    // continue;
                                    ?>
                                    <td class="nowrap-text text-center custom-td-bets btn-detail-main" data-toggle="modal"
                                      data-target="#modalDiscount" data-id-bot="<?php echo $bot['id']; ?>"
                                      data-crawid="<?php echo $item['id']; ?>">
                                      <div class="online-indicator" data-toggle="tooltip" data-placement="top"
                                        title="Đang live"><span class="blink"></span></div>
                                      <?php echo $item['score']; ?><br>
                                      <!-- <img src="assets/images/liveaction_logo.png" height="25"> -->
                                    </td>
                                  <?php
                                  } else {
                                    $stmt1 = $conn->prepare($getSQL['gbattlebybotID']);
                                    $stmt1->bindParam(":crawid", $item['id']);
                                    $stmt1->bindParam(":bot_id", $bot['id']);
                                    $stmt1->execute();
                                    $check = $stmt1->rowCount();
                                    $battle = $stmt1->fetch(PDO::FETCH_ASSOC);
                                    $stmt1->closeCursor();
                                    if ($check > 0) {
                                      ?>
                                      <td class="nowrap-text text-center custom-td-bets btn-detail" data-toggle="modal"
                                        data-target="#modeldetail" data-id-bot="<?php echo $bot['id']; ?>"
                                        data-crawid="<?php echo $item['id']; ?>">
                                        <?php
                                        if ($battle['status'] == 1) {
                                          ?>
                                          <div class="online-indicator" data-toggle="tooltip" data-placement="top"
                                            title="Đang live"> <span class="blink"></span></div>
                                        <?php
                                        } else if ($battle['status'] == 2) {
                                          ?>
                                            <div class="warning-indicator btn-warning" data-toggle="tooltip" data-placement="top"
                                              title="" data-original-title="Có lỗi"><span class="blink-warning btn-warning"></span>
                                            </div>
                                        <?php
                                        } else {
                                          ?>
                                            <div class="offline-indicator" data-toggle="tooltip" data-placement="top" title=""
                                              data-original-title="Chưa kích hoạt"><span class="blink-offline"></span></div>
                                        <?php
                                        }
                                        ?>
                                        <?php echo !empty($battle['score']) ? $battle['score'] : $item['score']; ?><br>
                                        <!-- <img src="assets/images/<?php echo $bot['image']; ?>" height="25"> -->
                                        <div>
                                          <?php echo isset($battle['WagerType']) ? str_replace("WAGERTYPE:", "", $battle['WagerType']) : ""; ?>
                                        </div>
                                      </td>
                                    <?php
                                    } else {
                                      echo "<td>Chưa có dữ liệu</td>";
                                    }
                                  }
                                }
                                ?>
                              </tr>
                            <?php
                            }
                            ?>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div> <!-- .row -->
              </div> <!-- .container-fluid -->

              <!--Modal chi tiet main-->
              <div class="modal fade right" id="modalDiscount" tabindex="-1" role="dialog"
                aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="true">
                <div class="modal-dialog modal-side modal-bottom-right modal-notify modal-danger" role="document">
                  <!--Content-->
                  <div class="modal-content">
                    <!--Header-->
                    <div class="modal-header custom-header-modal">
                      <div class="heading">Chi tiết</div>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true" class="white-text custom-close">&times;</span>
                      </button>
                    </div>
                    <!--Body-->
                    <div class="modal-body">
                      <div class="row">
                        <div class="col-4 pd-r-0">
                          <br>
                          <img src="assets/images/liveaction_logo.png" width="150px" height="80px">
                        </div>
                        <div class="col-8">
                          <div class="row">
                            <div class="col-6 text-center">
                              <span class="title-modal">Ngày-Giờ:</span><br>
                              <p id="date_view_main"></p>
                            </div>
                            <div class="col-6 text-center">
                              <span class="title-modal">Trận đấu:</span><br>
                              <p id="game_view_main"></p>
                            </div>
                            <div class="col-6 text-center">
                              <span class="title-modal">Tỉ lệ cược:</span><br>
                              <p id="score_view_main"></p>

                            </div>
                            <div class="col-6 text-center">
                              <span class="title-modal">Trạng thái:</span><br>
                              <p id="status_view_main"></p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!--Footer-->
                    <div class="modal-footer flex-center">
                      <!-- <a href="https://mdbootstrap.com/docs/standard/pro/" class="btn btn-danger">Đóng
                        <i class="far fa-gem ml-1 white-text"></i>
                      </a> -->
                      <a type="button" class="btn btn-danger color-close" data-dismiss="modal">Đóng</a>
                    </div>
                  </div>
                  <!--/.Content-->
                </div>
              </div>

              <!--Modal chi tiet bet-->
              <div class="modal fade right" id="modeldetail" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
                aria-hidden="true" data-backdrop="true">
                <div class="modal-dialog modal-side modal-bottom-right modal-notify modal-danger" role="document">
                  <!--Content-->
                  <div class="modal-content">
                    <!--Header-->
                    <div class="modal-header custom-header-modal">
                      <div class="heading">Chi tiết</div>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true" class="white-text custom-close">&times;</span>
                      </button>
                    </div>
                    <!--Body-->
                    <div class="modal-body">
                      <div class="row">
                        <div class="col-4 pd-r-0" id="image_view">
                          <br>
                        </div>
                        <div class="col-8">
                          <div class="row">
                            <div class="col-6 text-center">
                              <span class="title-modal">Ngày-Giờ:</span><br>
                              <p id="date_view"></p>
                            </div>
                            <div class="col-6 text-center">
                              <span class="title-modal">Trận đấu:</span><br>
                              <p id="game_view"></p>
                            </div>
                            <div class="col-6 text-center">
                              <span class="title-modal">Tỉ lệ cược:</span><br>
                              <p id="score_view"></p>
                              <p id="WagerType"></p>
                            </div>
                            <div class="col-6 text-center">
                              <span class="title-modal">Tiền cược ($):</span><br>
                              <p id="amount_view"></p>
                            </div>
                            <div class="col-6 text-center">
                              <span class="title-modal">Trạng thái:</span><br>
                              <p id="status_view"></p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!--Footer-->
                    <div class="modal-footer flex-center">
                      <!-- <a href="https://mdbootstrap.com/docs/standard/pro/" class="btn btn-danger">Đóng
                        <i class="far fa-gem ml-1 white-text"></i>
                      </a> -->
                      <a type="button" class="btn btn-danger color-close" data-dismiss="modal">Đóng</a>
                    </div>
                  </div>
                  <!--/.Content-->
                </div>
              </div>

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
      //       $('home.phpshorcut-menu').click(function() {
      //           $('.squircle').addClass('.modal-best');
      //           $('.squircle').removeClass('.modal-shortcut');
      //       });
      //   });
      // $( ".align-self-center" ).even().removeClass( "modal-shortcut-menu" );
    </script>
    <script>
      //convert cst

      //end
      $('.select2').select2({
        theme: 'bootstrap4',
      });
      $('.select2-multi').select2({
        multiple: true,
        theme: 'bootstrap4',
      });
      $('.drgpicker').daterangepicker({
        singleDatePicker: true,
        timePicker: false,
        showDropdowns: true,
        locale: {
          format: 'MM/DD/YYYY'
        }
      });
      $('.time-input').timepicker({
        'scrollDefault': 'now',
        'zindex': '9999' /* fix modal open */
      });
      /** date range picker */
      if ($('.datetimes').length) {
        $('.datetimes').daterangepicker({
          timePicker: true,
          startDate: moment().startOf('hour'),
          endDate: moment().startOf('hour').add(32, 'hour'),
          locale: {
            format: 'M/DD hh:mm A'
          }
        });
      }
      var start = moment().subtract(29, 'days');
      var end = moment();

      function cb(start, end) {
        $('home.phpreportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
      }
      $('home.phpreportrange').daterangepicker({
        startDate: start,
        endDate: end,
        ranges: {
          'Today': [moment(), moment()],
          'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
          'Last 7 Days': [moment().subtract(6, 'days'), moment()],
          'Last 30 Days': [moment().subtract(29, 'days'), moment()],
          'This Month': [moment().startOf('month'), moment().endOf('month')],
          'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        }
      }, cb);
      cb(start, end);
      $('.input-placeholder').mask("00/00/0000", {
        placeholder: "__/__/____"
      });
      $('.input-zip').mask('00000-000', {
        placeholder: "____-___"
      });
      $('.input-money').mask("home.php.home.phphome.php0,00", {
        reverse: true
      });
      $('.input-phoneus').mask('(000) 000-0000');
      $('.input-mixed').mask('AAA 000-S0S');
      $('.input-ip').mask('0ZZ.0ZZ.0ZZ.0ZZ', {
        translation: {
          'Z': {
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
          [{
            'font': []
          }],
          [{
            'header': [1, 2, 3, 4, 5, 6, false]
          }],
          ['bold', 'italic', 'underline', 'strike'],
          ['blockquote', 'code-block'],
          [{
            'header': 1
          },
          {
            'header': 2
          }
          ],
          [{
            'list': 'ordered'
          },
          {
            'list': 'bullet'
          }
          ],
          [{
            'script': 'sub'
          },
          {
            'script': 'super'
          }
          ],
          [{
            'indent': '-1'
          },
          {
            'indent': '+1'
          }
          ], // outdent/indent
          [{
            'direction': 'rtl'
          }], // text direction
          [{
            'color': []
          },
          {
            'background': []
          }
          ], // dropdown with defaults from theme
          [{
            'align': []
          }],
          ['clean'] // remove formatting button
        ];
        var quill = new Quill(editor, {
          modules: {
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
      $(document).ready(function () {
        $('.btn-detail-main').click(function () {
          var id = $(this).data("id-bot");
          var crawid = $(this).data("crawid");
          var data_id = {
            id: crawid,
            func: 'gCrawHistoryBotMain',
          }
          // console.log("10stack",data_id);
          $.ajax({
            data: data_id,
            type: "get",
            url: "common/get.php",
            success: function (response) {
              // console.log("response",response);
              if (response.length > 0) {
                var datetime = response[0]['date_event'].slice(0, response[0]['date_event'].indexOf('-'));
                var datetime_format = moment(datetime, "MMM D, YYYY HH:mm A").format("DD-MM-YYYY,HH:mm:ss A");
                var date = datetime_format.split(',');
                var game = response[0]['game'].split("/");
                var image = "liveaction_logo.png";
                var score = response[0]['score']
                var amount = response[0]['amount']
                var status = 1;
                $("#date_view_main").html(date[0] + '<br>' + date[1]);
                $("#game_view_main").html(game[0] + '<br>' + game[1]);
                $("#score_view_main").html(score);
                $("#amount_view_main").html(amount);

                if (status == 0) {
                  $("#status_view_main").html("Thất bại");
                } else if (status == 1) {
                  $("#status_view_main").html("Thành công");
                } else {
                  $("#status_view_main").html("Không tìm thấy trận đấu hoặc bị thay đổi tỉ số");
                }
                // $("#image_view_10stack").html("<img src='assets/images/"+ image +"' width='150px' height='80px'> ")
              }
            }
          })

        });
        //
        $('.btn-detail').click(function () {
          var id = $(this).data("id-bot");
          var crawid = $(this).data("crawid");
          var data_id = {
            id: id,
            id_cra: crawid,
            func: 'gCrawHistoryBotId',
          }

          // console.log("betnwin",data_id);
          $.ajax({
            data: data_id,
            type: "get",
            url: "common/get.php",
            success: function (response) {
              // console.log(response);
              if (response.length > 0) {
                var datetime = response[0]['date_event'].slice(0, response[0]['date_event'].indexOf('-'));
                var datetime_format = moment(datetime, "MMM D, YYYY HH:mm A").format("DD-MM-YYYY,HH:mm:ss A");
                var date = datetime_format.split(',');

                var game = response[0]['game'].split("/");
                var image = response[0]['image'];
                var score = response[0]['score']
                var amount = response[0]['amount']
                var status = response[0]['status']
                var WagerType = response[0]['WagerType'] ? response[0]['WagerType'] : "";

                $("#date_view").html(date[0] + '<br>' + date[1]);
                $("#game_view").html(game[0] + '<br>' + game[1]);
                $("#score_view").html(score);
                $("#amount_view").html(amount);
                $("#WagerType").html(WagerType);

                if (status == 0) {
                  $("#status_view").html("Thất bại");
                } else if (status == 1) {
                  $("#status_view").html("Thành công");
                } else {
                  $("#status_view").html("Không tìm thấy trận đấu hoặc bị thay đổi tỉ số");
                }
                $("#image_view").html("<img src='assets/images/" + image + "' width='150px' height='80px'> ")
              }
            }
          })

        });
        //crawlHistory
        $(".btn-crawlHistory").click(function () {
          $(".loading-div").show();
          $.ajax({
            type: "post",
            // url: "http://192.168.1.20:333/?id=1",
            url: "common/main_bat.php",
            data: { type: 1 },
            success: function (response) {
              console.log(response);
              $(".loading-div").hide()
              // location.reload();
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
              console.log(2222222, textStatus);

              $(".loading-div").hide()
              alert("Lấy lịch sử thất bại")
            }

          })
        })
        const runbet = (typepet) => {
          $.ajax({
            type: "post",
            // url: "http://192.168.1.20:444/?id=1",
            url: "common/main_bat.php",
            data: { type: typepet },
            success: function (response) {
              console.log(1111111, response);
              $(".loading-div").hide()
              // location.reload();
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
              console.log(2222222, textStatus);

              $(".loading-div").hide()
              alert("Clone thất bại")
            }

          })
        }
        //clone bet
        $(".btn-cloneBet").click(function () {
          runbet(2)//betwin()
          runbet(3)//10stack
          runbet(4)//8platinum
          runbet(5)//pet_2bet
          runbet(6)//loginibet
          runbet(7)//LoginPig11
          // $(".loading-div").show();
          // $.ajax({
          //   type: "post",
          //   // url: "http://192.168.1.20:444/?id=1",
          //   url: "common/main_bat.php",
          //   data: { type: 2 },
          //   success: function (response) {
          //     console.log(1111111, response);
          //     $(".loading-div").hide()
          //     // location.reload();
          //   },
          //   error: function (XMLHttpRequest, textStatus, errorThrown) {
          //     console.log(2222222, textStatus);

          //     $(".loading-div").hide()
          //     alert("Clone thất bại")
          //   }

          // })
        })
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
<!-- $game = explode( '/', $item['game']);
$datetime = substr($item['date_event'], 0, 21);
$datetime = date('d-m-Y H:i:s', strtotime($datetime));
$date = substr($datetime, 0, 10);
$time = substr($datetime, 11, 20); -->