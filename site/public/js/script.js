function openMenuMobile() {
    $(".menu-mb").width("250px");
    $(".btn-menu-mb").hide("slow");
}

function closeMenuMobile() {
    $(".menu-mb").width(0);
    $(".btn-menu-mb").show("slow");
}

$(function () {
    $(".form-contact").validate({
        rules: {
            fullname: {
                required: true,
                maxlength: 50,
                regex: /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+$/i,
            },
            email: {
                required: true,
                regex: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
            },
            mobile: {
                required: true,
                regex: /^0([0-9]{9,9})$/,
            },
            content: {
                required: true,
            },
        },

        messages: {
            fullname: {
                required: "Vui lòng nhập đầy đủ họ và tên.",
                maxlength: "Họ và tên không được quá 50 ký tự.",
                regex: "Họ và tên không được chứa số và ký tự đặc biệt.",
            },
            email: {
                required: "Vui lòng nhập email",
                regex: "email phải có định dạng là abcd@email.com",
            },
            mobile: {
                required: "Vui lòng nhập số điện thoại",
                regex: "Số điện thoại không chính xác.",
            },
            content: {
                required: "Vui lòng nhập nội dung",
            },
        },
        submitHandler: function (form) {
            $(".message").html(
                '<i class="fas fa-spinner fa-spin"></i> Hệ thống đang gửi mail, vui lòng chờ...'
            );
            $(".message").show();
            $.ajax({
                type: "POST",
                url: "?c=contact&a=sendEmail",
                data: $(form).serialize(),
                success: function (reponse) {
                    $(".message").html(reponse);
                },
            });
        },
    });

    $.validator.addMethod(
        "regex",
        function (value, element, regexp) {
            var re = new RegExp(regexp);
            return this.optional(element) || re.test(value);
        },
        "Please check your input."
    );

    // Tìm kiếm và sắp xếp sản phẩm
    $("#sort-select").change(function (event) {
        var fullURL = getUpdatedParam("sort", $(this).val());
        window.location.href = fullURL;
    });

    // Tìm kiếm theo range
    $("main .price-range input").click(function (event) {
        var price_range = $(this).val();
        window.location.href = `?c=product&price-range=${price_range}`;
    });

    $(".product-container").hover(function () {
        $(this).children(".button-product-action").toggle(400);
    });

    // Display or hidden button back to top
    $(window).scroll(function () {
        if ($(this).scrollTop()) {
            $(".back-to-top").fadeIn();
        } else {
            $(".back-to-top").fadeOut();
        }
    });

    // Khi click vào button back to top, sẽ cuộn lên đầu trang web trong vòng 0.8s
    $(".back-to-top").click(function () {
        $("html").animate({ scrollTop: 0 }, 800);
    });

    // Hiển thị form đăng ký
    $(".btn-register").click(function () {
        $("#modal-login").modal("hide");
        $("#modal-register").modal("show");
    });

    // Hiển thị form forgot password
    $(".btn-forgot-password").click(function () {
        $("#modal-login").modal("hide");
        $("#modal-forgot-password").modal("show");
    });

    // Hiển thị form đăng nhập
    $(".btn-login").click(function () {
        $("#modal-login").modal("show");
    });

    // Fix add padding-right 17px to body after close modal
    // Don't rememeber also attach with fix css
    $(".modal").on("hide.bs.modal", function (e) {
        e.stopPropagation();
        $("body").css("padding-right", 0);
    });

    // Hiển thị cart dialog
    $(".btn-cart-detail").click(function () {
        $("#modal-cart-detail").modal("show");
    });

    // Hiển thị aside menu mobile
    $(".btn-aside-mobile").click(function () {
        $("main aside .inner-aside").toggle();
    });

    // Hiển thị carousel for product thumnail
    $(
        "main .product-detail .product-detail-carousel-slider .owl-carousel"
    ).owlCarousel({
        margin: 10,
        nav: true,
    });
    // Bị lỗi hover ở bộ lọc (mobile) & tạo thanh cuộn ngang
    // Khởi tạo zoom khi di chuyển chuột lên hình ở trang chi tiết
    // $('main .product-detail .main-image-thumbnail').ezPlus({
    //     zoomType: 'inner',
    //     cursor: 'crosshair',
    //     responsive: true
    // });

    // Cập nhật hình chính khi click vào thumbnail hình ở slider
    $("main .product-detail .product-detail-carousel-slider img").click(
        function (event) {
            /* Act on the event */
            $("main .product-detail .main-image-thumbnail").attr(
                "src",
                $(this).attr("src")
            );
            var image_path = $(
                "main .product-detail .main-image-thumbnail"
            ).attr("src");
            $(".zoomWindow").css(
                "background-image",
                "url('" + image_path + "')"
            );
        }
    );

    $("main .product-detail .product-description .rating-input").rating({
        min: 0,
        max: 5,
        step: 1,
        size: "md",
        stars: "5",
        showClear: false,
        showCaption: false,
    });

    $(
        "main .product-detail .product-description .answered-rating-input"
    ).rating({
        min: 0,
        max: 5,
        step: 1,
        size: "md",
        stars: "5",
        showClear: false,
        showCaption: false,
        displayOnly: false,
        hoverEnabled: true,
    });

    $("main .ship-checkout[name=payment_method]").click(function (event) {
        /* Act on the event */
    });

    $("input[name=checkout]").click(function (event) {
        /* Act on the event */
        window.location.href = "dat-hang.html";
    });

    $("input[name=back-shopping]").click(function (event) {
        /* Act on the event */
        window.location.href = "san-pham.html";
    });

    // Hiển thị carousel for relative products
    $("main .product-detail .product-related .owl-carousel").owlCarousel({
        loop: true,
        margin: 10,
        nav: true,
        dots: false,
        responsive: {
            0: {
                items: 2,
            },
            600: {
                items: 4,
            },
            1000: {
                items: 5,
            },
        },
    });
});

// Login in google
function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://study.com/register/google/backend/process.php");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onload = function () {
        console.log("Signed in as: " + xhr.responseText);
    };
    xhr.send("idtoken=" + id_token);
}

// Cập nhật giá trị của 1 param cụ thể
function getUpdatedParam(k, v) {
    const fullUrl = window.location.href;
    const objUrl = new URL(fullUrl);
    objUrl.searchParams.set(k, v);
    return objUrl.toString();
}

// Paging
function goToPage(page) {
    var fullUrl = getUpdatedParam("page", page);
    window.location.href = fullUrl;
}
