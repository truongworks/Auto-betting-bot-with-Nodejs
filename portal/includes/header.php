<header class="blog-header custom-header">
  <div class="row flex-nowrap justify-content-between align-items-center">
    <div class="col-4 pt-1">
      <a href="home.php"><img src="assets/images/Logo_original.svg" width="150px"></a>
    </div>
    <div class="col-4 text-center d-none">
      <nav class="custom-bets">
        <div class="nav nav-fill justify-content-center" id="nav-tab" role="tablist">
          <a class="nav-item custom-nav-item-pd header-navtabs-sport active" id="nav-home-tab" data-toggle="tab"
            href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">THỂ THAO</a>
          <a class="nav-item custom-nav-item-pd header-navtabs-casino" id="nav-profile-tab" data-toggle="tab"
            href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">SÒNG BẠC</a>
        </div>
      </nav>
    </div>
    <div class="col-4 d-flex justify-content-end align-items-center">
      <ul class="nav">
        <li class="nav-item nav-notif">
          <a class="nav-link text-muted my-2 pd-0" href="./home.php" data-toggle="modal"
            data-target=".modal-shortcut">
            <span class="fe fe-grid fe-16 custom-fe"></span>
          </a>
          <a class="nav-link text-muted my-2 pd-0 d-none" href="./home.php" data-toggle="modal"
            data-target=".modal-best">
            $0.00
          </a>
        </li>
      </ul>
      <ul class="nav">
        <li class="nav-item dropdown show">
          <a class="nav-link dropdown-toggle text-muted pr-0" href="#" id="navbarDropdownMenuLink"
            role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
            <span class="avatar avatar-sm mt-2">
              <img src="./assets/avatars/face-1.jpg" alt="..." class="avatar-img rounded-circle">
            </span>
          </a>
          <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
            <a class="dropdown-item" href="#">Thông tin</a>
            <a class="dropdown-item" href="#">Cài đặt</a>
            <a class="dropdown-item" href="dashboard-bets.php">Quản lý Bets</a>
            <a class="dropdown-item" href="transaction-history.php">Lịch sử giao dịch</a>
            <a class="dropdown-item" href="../logout.php">Đăng xuất</a>
          </div>
        </li>
      </ul>
    </div>
  </div>
</header>
<nav class="topnav navbar navbar-light d-none">
  <button type="button" class="navbar-toggler text-muted mt-2 p-0 mr-3 collapseSidebar d-none">
    <i class="fe fe-menu navbar-toggler-icon"></i>
  </button>
  <form class="form-inline mr-auto searchform text-muted">
    <input class="form-control mr-sm-2 bg-transparent border-0 pl-4 text-muted" type="search"
      placeholder="Type something..." aria-label="Search">
  </form>
  <ul class="nav">
    <li class="nav-item d-none">
      <a class="nav-link text-muted my-2" href="home.html" id="modeSwitcher" data-mode="light">
        <i class="fe fe-sun fe-16"></i>
      </a>
    </li>
    <li class="nav-item">
      <a class="nav-link text-muted my-2" href="./home.html" data-toggle="modal" data-target=".modal-shortcut">
        <span class="fe fe-grid fe-16"></span>
      </a>
    </li>
    <li class="nav-item nav-notif">
      <a class="nav-link text-muted my-2" href="./home.html" data-toggle="modal" data-target=".modal-notif">
        <span class="fe fe-bell fe-16"></span>
        <span class="dot dot-md bg-success"></span>
      </a>
    </li>
    <li class="nav-item nav-notif">
      <a class="nav-link text-muted my-2" href="./home.html" data-toggle="modal" data-target=".modal-notif">
        <span class="fe fe-bell fe-16"></span>
        <span class="dot dot-md bg-success"></span>
      </a>
    </li>
    <li class="nav-item dropdown">
      <a class="nav-link dropdown-toggle text-muted pr-0" href="home.html" id="navbarDropdownMenuLink" role="button"
        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <span class="avatar avatar-sm mt-2">
          <img src="./assets/avatars/face-1.jpg" alt="..." class="avatar-img rounded-circle">
        </span>
      </a>
      <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
        <a class="dropdown-item" href="home.html">Profile</a>
        <a class="dropdown-item" href="home.html">Settings</a>
        <a class="dropdown-item" href="home.html">Activities</a>
      </div>
    </li>
  </ul>
</nav>
<nav class="custom-width-nav">
  <div class="nav nav-tabs nav-fill justify-content-center" id="nav-tab" role="tablist">
    <!-- <a class="nav-item nav-link custom-nav-item-pd active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true"><img src="assets/images/soccer-ball.png" width="25px" class="mr-2">Bóng đá & Bóng rổ</a> -->
    <a class="nav-item nav-link custom-nav-item-pd active" href="home.php">Bóng đá & Bóng rổ</a>
    <a class="nav-item nav-link d-none custom-nav-item-pd" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false"><img src="assets/images/rugby-ball.png" width="25px" class="mr-2">Bóng bầu dục</a>
    <a class="nav-item nav-link d-none custom-nav-item-pd" id="nav-contact-tab" data-toggle="tab" href="#nav-contact" role="tab" aria-controls="nav-contact" aria-selected="false"><img src="assets/images/basketball.png" width="25px" class="mr-2">Bóng rổ</a>
    <a class="nav-item nav-link d-none custom-nav-item-pd" id="nav-about-tab" data-toggle="tab" href="#nav-about" role="tab" aria-controls="nav-about" aria-selected="false"><img src="assets/images/ball.png" width="25px" class="mr-2">Bóng chày</a>
  </div>
</nav>