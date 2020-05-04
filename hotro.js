/* Xây dựng hàm sinh ID tự đông, output là chuỗi ID duy nhất */
function taoId() {
    var id = '';

    /* lấy milisecond ở thời điểm hiện tại; 1s = 1000 milisecond */
    id = Math.random().toString().substr(2,10) + "_" + String(new Date().getTime());
    return id;
}