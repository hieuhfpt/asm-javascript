/* Mô tả: Để tạo ra đối tượng, dựa vào các thuộc tính được truyền vào
           Input: Các thuộc tính 
           Output: Một đối tượng
       */
function TaoDoiTuongSanPham(hinhAnh, ten, giaGoc, phanTramGiamGia, khuVuc, id) {
    var sanPham = new Object();
    /* bước 1: gắn các thuộc tính cho đối tượng */
    sanPham.hinhAnh = hinhAnh;
    sanPham.ten = ten;
    sanPham.giaGoc = giaGoc;
    sanPham.phanTramGiamGia = phanTramGiamGia;
    sanPham.khuVuc = khuVuc;

    if (id != null) {
        sanPham.id = id;
    }
    else {
        sanPham.id = taoId();
    }

    /* Bước 2: viết phương thức cho đối tượng */
    sanPham.tinhGiaBan = function () {
        // logic xử lý của phương thức
        var giaBan = this.giaGoc * (100 - this.phanTramGiamGia) / 100;
        return giaBan;
    }

    sanPham.toJson = function () {
        var json = JSON.stringify(this);
        return json;
    }

    /* Từ json chuyển thành một đối tượng đầy đủ các phương thức 
        input: json
        output: đối tượng đầy đủ
    */
    sanPham.fromJSON = function (json) {
        var doiTuongDayDu = new Object();
        /* Bước 1: Chuyển từ json thành đối tượng */
        var doiTuong = JSON.parse(json);

        /* Bước 2: Chuyển đôi tượng thành đối tượng đầy đủ phương thức */
        var doiTuongDayDu = TaoDoiTuongSanPham(doiTuong.hinhAnh, doiTuong.ten, doiTuong.giaGoc, doiTuong.phanTramGiamGia, doiTuong.khuVuc);
        return doiTuongDayDu;
    }

    /* Từ json cảu danh sách sản phẩm trả về một danh sách sản phẩm có đầy đủ các phương thức
        Input: json của danh sách sản phẩm
        output: danh sách sản pẩm đầy đủ 
    */
    sanPham.fromJSONs = function (jsonDanhSachSanPham) {
        var danhSachSanPhamDayDu = new Array();
        var danhSachSanPham = JSON.parse(jsonDanhSachSanPham);

        for (var i = 0; i < danhSachSanPham.length; i++) {
            var sanPham = danhSachSanPham[i];
            var sanPhamDayDu = TaoDoiTuongSanPham(sanPham.hinhAnh, sanPham.ten, sanPham.giaGoc, sanPham.phanTramGiamGia, sanPham.khuVuc);
            danhSachSanPhamDayDu[i] = sanPhamDayDu;
        }
        return danhSachSanPhamDayDu;
    }
    return sanPham;
}


/* Mô tả: Chuyển một danh sách đối tượng, thành một đoạn HTML để hiển thị được danh sách sản phẩm ra màn hinh
    Input: Danh sách sản phẩm
    Output: HTML hiển thị danh sách sản phẩm
*/
function chuyenDanhSachDoiTuongSanPhamThanhHTML(danhSachSanPham) {
    var HTMLDanhSachSanPham = '<div class="items">';
    for (var i = 0; i < danhSachSanPham.length; i++) {
        var sanPham = danhSachSanPham[i];
        var htmlSanPham = chuyenDoiTuongSanPhamThanhHTML(sanPham);
        HTMLDanhSachSanPham = HTMLDanhSachSanPham + htmlSanPham;
    }
    HTMLDanhSachSanPham = HTMLDanhSachSanPham + '</div>';
    return HTMLDanhSachSanPham;
}

/* Mô tả: Chuyển một đối tượn thành một đoạn HTML
    Đầu vào: đối tượng
    Đầu ra: Đoạn HTML của đối tượng đó
*/
function chuyenDoiTuongSanPhamThanhHTML(sanPham) {
    /* Tạo lại đối tượng có đầy đủ các function */
    sanPham = TaoDoiTuongSanPham(sanPham.hinhAnh, sanPham.ten, sanPham.giaGoc, sanPham.phanTramGiamGia, sanPham.khuVuc, sanPham.id);
    console.log(sanPham);
    var html = '';
    html += '<div class="item">'
    html += '<div class="item-thumb">'
    html += '<img src="' + sanPham.hinhAnh + '" alt="" srcset=""></div>'

    html += '<h2 class="item-title">' + sanPham.ten + '</h2>'
    html += '<div class="item-price">'
    html += ' <span class="item-price-origin">' + sanPham.giaGoc + ' đ</span>'
    html += '<span class="item-price-sale">' + sanPham.tinhGiaBan() + ' đ</span>'
    html += '</div>'
    html += '<button onclick="onClickDuaVaoGioHang(\'' + sanPham.id + '\')" class="btn btn-primary">Đưa vào giỏ hàng</button>'
    html += '</div>'
    return html;
}

/* Mô tả: Từ id sản phẩm lấy lên đối tượng sản phẩm với đầy đủ các hàm bên trong đối tượng
    input: idSanPham
    ouput: đối tượng sản phẩm */
function laySanPhamTheoId(idSanPham) {
    var sanPham = new Object();
    /* Bước 1: Load toàn bộ danh sách sản phẩm dưới local storage lên */
    var danhSachSanPham = layDanhSachSanPhamDuoiLocalStorage();

    /* Bước 2: Tìm ra đối tượng nào trong danh sách mà có id = idSanPham */
    for (var i = 0; i < danhSachSanPham.length; i++) {
        var sanPhamHienTai = danhSachSanPham[i];
        if (sanPhamHienTai.id == idSanPham) {
            sanPham = sanPhamHienTai;
        }
    }

    /* Bước 3: Chuyển đối tượng thành đối tượng đầy đủ  */
    sanPham = TaoDoiTuongSanPham(sanPham.hinhAnh, sanPham.ten, sanPham.giaGoc, sanPham.phanTramGiamGia, sanPham.khuVuc, sanPham.id);
    return sanPham;
}

/* Mô tả: lấy toàn bộ danh sách sp dưới local storage lên */
function layDanhSachSanPhamDuoiLocalStorage() {
    /* Bước 1: load json */
    var jsonDanhSachSanPham = localStorage.getItem('danhSachSanPham');

    /* Bước 2: Chuyển json thành đối tượng */
    var danhSachSanPham = JSON.parse(jsonDanhSachSanPham);
    return danhSachSanPham;
}