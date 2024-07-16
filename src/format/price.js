export const formatCurrency = (vndString) => {
    // Loại bỏ ký hiệu "₫" và chuyển đổi chuỗi thành số
    const number = parseInt(vndString.replace('₫', '').replace(/\./g, ''), 10);

    // Định dạng số với dấu phẩy phân cách hàng nghìn và thêm ký hiệu "₫"
    const formattedNumber = number.toLocaleString('vi-VN') + '₫';

    return formattedNumber;
}

export const formatISODateTime = (isoString) => {
    // Chuyển đổi chuỗi thành đối tượng Date
    const date = new Date(isoString);

    // Lấy các thành phần ngày, tháng, năm, giờ, phút, giây
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    // Định dạng lại chuỗi theo dạng ngày/tháng/năm giờ:phút:giây
    const formattedDateTime = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;

    return formattedDateTime;
}