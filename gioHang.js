/* yêu cầu: lấy giỏ hàng từ local storage lên 
    output: giỏ hàng*/
function layGioHangTuLocalStorage() {
    var gioHang = new Array();
    //TODO: truy cập vào local storage để lấy giỏ hàng
    /* Bước 1: lấy json  */
    var jsonGioHang = localStorage.getItem('gioHang');

    /* Bước 2: chuyển json thành đối tượng giỏ hàng */
    if (jsonGioHang != null)
        gioHang = JSON.parse(jsonGioHang);

    return gioHang;
}

/* Yêu cầu: Thêm sản phẩm vào giỏ hàng 
    input: idSanpham, giỏ hàng 
    ouput: giỏ hàng sau khi được thêm sản phẩm */
function themSanPhamVaoGioHang(idSanPham, gioHang) {
    var gioHangSauKhiDuocThem = gioHang;
    /* Bước 1: tạo ra đối tượng item giỏ hàng */
    var itemGioHang = TaoDoiTuongItemGioHang(idSanPham, 1);

    /* Bước 2: Thêm vào giỏ hàng item mới */
    console.log(gioHang);
    gioHangSauKhiDuocThem.push(itemGioHang);

    return gioHangSauKhiDuocThem;
}

/* Yêu cầu: lưu trữ giỏ hàng xuống local storage
    input: gioHang
    output:  */
function luuGioHangVaoLocalStorage(gioHang) {
    /* Buwocs 1: Chuyển giỏ hàng thành json */
    var jsonGioHang = JSON.stringify(gioHang);

    /* Bước 2: Lưu json xuống local storage */
    localStorage.setItem('gioHang', jsonGioHang);
}

function TaoDoiTuongItemGioHang(idSanPham, soLuong) {
    var itemGioHang = new Object();
    itemGioHang.idSanPham = idSanPham;
    itemGioHang.soLuong = soLuong;
    return itemGioHang;
}