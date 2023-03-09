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
  <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">
    <title>RedBolt</title>
    <!-- Simple bar CSS -->
    <link rel="stylesheet" href="css/simplebar.css">
    <!-- Fonts CSS -->
    <link href="https://fonts.googleapis.com/css2?family=Overpass:ital,wght@0,100;0,200;0,300;0,400;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
    <!-- Icons CSS -->
    <link rel="stylesheet" href="css/feather.css">
    <link rel="stylesheet" href="css/dataTables.bootstrap4.css">
    <!-- Date Range Picker CSS -->
    <link rel="stylesheet" href="css/daterangepicker.css">
    <!-- App CSS -->
    <link rel="stylesheet" href="css/app-light.css" id="lightTheme">
    <link rel="stylesheet" href="css/app-dark.css" id="darkTheme" disabled>
</head>
<style>
  
  .form-floating>.form-control, .form-floating>.form-select {
    height: calc(3.5rem + 2px);
    padding: 1rem 0.75rem;
}
</style>
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
                    </div>
                    <div class="card radius-sm shadow border-0">
                      <!-- table -->
                      <div class="card-body p-3">
                        <div class="filter-datatable-form bg-light radius-sm mt-4 mb-3">
                          <div class="font-title font-17pt text-uppercase border-bottom p-3">
                            LỌC
                          </div>
                          <div class="p-3">
                            <div class="row">
                              <div class="col-sm-12 col-md-12 col-lg-12 font-title mb-3">Lọc theo tùy chọn</div>
                              <div class="col-sm-12 col-md-6 col-lg-6">
                                <label class="font-title">Từ ngày</label>
                                <div class="form-floating mb-3">
                                  <input type="text" class="form-control drgpicker" placeholder=" " id="drgpicker-start">
                                </div>
                              </div>
                              <div class="col-sm-12 col-md-6 col-lg-6">
                                <label class="font-title">Đến ngày</label>
                                <div class="form-floating mb-3">
                                  <input type="text" class="form-control drgpicker" placeholder=" " id="drgpicker-start">
                                </div>
                              </div>
                              <div class="col-sm-12 col-md-12 col-lg-12">
                                <div class="ml-atuo" style="float: right;">
                                  <button class="btn btn-primary">Lọc</button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="col-sm-12" style="overflow-x: auto;">
                          <table class="table datatables" id="dataTable-1">
                            <thead class="thead-dark">
                              <tr>
                                <th class="text-center font-title text-uppercase nowrap-text font-title">STT</th>
                                <th class="text-center font-title text-uppercase nowrap-text font-title">Ngày giao dịch</th>
                                <th class="text-center font-title text-uppercase nowrap-text font-title">Tên giao dịch</th>
                                <th class="text-center font-title text-uppercase nowrap-text font-title">Bets</th>
                                <th class="text-center font-title text-uppercase nowrap-text font-title">Giải đấu</th>
                                <th class="text-center font-title text-uppercase nowrap-text font-title">Trận</th>
                                <th class="text-center font-title text-uppercase nowrap-text font-title">Số tiền giao dịch</th>
                                <th class="text-center font-title text-uppercase nowrap-text font-title">Loại giao dịch</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td class="text-center nowrap-text">1</td>
                                <td class="text-center nowrap-text">12/12/2022</td>
                                <td class="text-center nowrap-text">Tên giao dịch 1</td>
                                <td class="text-center nowrap-text">LIVEACTIONBETS.COM</td>
                                <td class="text-center nowrap-text" style="min-width: 150px;">World Cup</td>
                                <td class="nowrap-text text-center row custom-td-battle background-all-td">
                                  <div class="col-5">
                                    <img src="assets/images/qata.jpg" width="50px" height="50px">
                                    <div class="team-name text-center mt-2" style="line-height:1.2; white-space: normal;">Qatar</div>
                                  </div>
                                  <div class="col-2" style="line-height: 65px; font-weight: bold;">VS</div>
                                  <div class="col-5">
                                    <img src="assets/images/ecuador.jpg" width="50px" height="50px">
                                    <div class="team-name text-center mt-2" style="line-height:1.2; white-space: normal;">Ecuador</div>
                                  </div>
                                </td>
                                <td class="text-center nowrap-text">$100.00</td>
                                <td class="text-center nowrap-text font-title"><span class="btn btn-success title-loai-giao-dich">Tiền vào</span></td>
                              </tr>
                              <tr>
                                <td class="text-center nowrap-text">2</td>
                                <td class="text-center nowrap-text">21/12/2022</td>
                                <td class="text-center nowrap-text">Tên giao dịch 2</td>
                                <td class="text-center nowrap-text">LIVEACTIONBETS.COM</td>
                                <td class="text-center nowrap-text" style="min-width: 150px;">World Cup</td>
                                <td class="nowrap-text text-center row custom-td-battle background-all-td">
                                  <div class="col-5">
                                    <img src="assets/images/anh.png" width="50px" height="50px">
                                    <div class="team-name text-center mt-2" style="line-height:1.2; white-space: normal;">Anh</div>
                                  </div>
                                  <div class="col-2" style="line-height: 65px; font-weight: bold;">VS</div>
                                  <div class="col-5">
                                    <img src="assets/images/iran.png" width="50px" height="50px">
                                    <div class="team-name text-center mt-2" style="line-height:1.2; white-space: normal;">Iran</div>
                                  </div>
                                </td>
                                <td class="text-center nowrap-text">$100.00</td>
                                <td class="text-center nowrap-text font-title"><span class="btn btn-warning title-loai-giao-dich">Tiền ra</span></td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
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
    <script src='js/fullcalendar.js'></script>
    <script src='js/fullcalendar.custom.js'></script>
    <script src='js/jquery.dataTables.min.js'></script>
    <script src='js/dataTables.bootstrap4.min.js'></script>

    <script>
      /** full calendar */
      var calendarEl = document.getElementById('calendar');
      if (calendarEl)
      {
        document.addEventListener('DOMContentLoaded', function()
        {
          var calendar = new FullCalendar.Calendar(calendarEl,
          {
            plugins: ['dayGrid', 'timeGrid', 'list', 'bootstrap'],
            timeZone: 'UTC',
            themeSystem: 'bootstrap',
            header:
            {
              left: 'today, prev, next',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
            },
            buttonIcons:
            {
              prev: 'fe-arrow-left',
              next: 'fe-arrow-right',
              prevYear: 'left-double-arrow',
              nextYear: 'right-double-arrow'
            },
            weekNumbers: true,
            eventLimit: true, // allow "more" link when too many events
            events: 'https://fullcalendar.io/demo-events.json'
          });
          calendar.render();
        });
      }
    </script>
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
          format: 'DD/MM/YYYY'
        }
      });
      $('.time-input').timepicker(
      {
        'scrollDefault': 'now',
        'zindex': '9999' /* fix modal open */
      });
      /** date range picker */
      if ($('.datetimes').length)
      {
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

      function cb(start, end)
      {
        $('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
      }
      $('#reportrange').daterangepicker(
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
      $('.input-money').mask("#.##0,00",
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
      if (editor)
      {
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
      (function()
      {
        'use strict';
        window.addEventListener('load', function()
        {
          // Fetch all the forms we want to apply custom Bootstrap validation styles to
          var forms = document.getElementsByClassName('needs-validation');
          // Loop over them and prevent submission
          var validation = Array.prototype.filter.call(forms, function(form)
          {
            form.addEventListener('submit', function(event)
            {
              if (form.checkValidity() === false)
              {
                event.preventDefault();
                event.stopPropagation();
              }
              form.classList.add('was-validated');
            }, false);
          });
        }, false);
      })();
    </script>
    <script>
      var uptarg = document.getElementById('drag-drop-area');
      if (uptarg)
      {
        var uppy = Uppy.Core().use(Uppy.Dashboard,
        {
          inline: true,
          target: uptarg,
          proudlyDisplayPoweredByUppy: false,
          theme: 'dark',
          width: 770,
          height: 210,
          plugins: ['Webcam']
        }).use(Uppy.Tus,
        {
          endpoint: 'https://master.tus.io/files/'
        });
        uppy.on('complete', (result) =>
        {
          console.log('Upload complete! We’ve uploaded these files:', result.successful)
        });
      }
    </script>
    <script src="js/apps.js"></script>
    <script>
      $('#dataTable-1').DataTable(
      {
        autoWidth: true,
        "lengthMenu": [
          [16, 32, 64, -1],
          [16, 32, 64, "All"]
        ]
      });
    </script>
    <script type="text/javascript">
      function isCharater(evt) {
        evt = (evt) ? evt : window.event;
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        if (charCode > 31) {
          return false;
        }
        return true;
      }
    </script>
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