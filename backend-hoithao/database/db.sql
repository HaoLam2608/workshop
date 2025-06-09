Create database	QLHOITHAO;
use QLHOITHAO;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) NOT NULL,
    hoten VARCHAR(100) NOT NULL,
    diachi VARCHAR(255),
    role ENUM('author', 'reviewer') NOT NULL DEFAULT 'author',
    coquan VARCHAR(100),
    linhvu VARCHAR(100),
    hocvi VARCHAR(50),
    username VARCHAR(50) UNIQUE,
    password VARCHAR(255) NOT NULL
);
CREATE TABLE baibao (
    mabaibao INT AUTO_INCREMENT PRIMARY KEY,
    tenbaibao VARCHAR(255) NOT NULL,
    linhvuc VARCHAR(100),
    tomtat TEXT,
    danhgia ENUM('chua_danh_gia', 'da_danh_gia') DEFAULT 'chua_danh_gia',
    status ENUM('da_phan_bien' ,'dang_cho_phan_cong', 'da_phan_cong') DEFAULT 'dang_cho_phan_cong';
);

CREATE TABLE thamgia (
    id_tacgia INT,
    id_baibao INT,
    vai_tro VARCHAR(100),
    PRIMARY KEY (id_tacgia, id_baibao),
    FOREIGN KEY (id_tacgia) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (id_baibao) REFERENCES baibao(mabaibao) ON DELETE CASCADE
);
CREATE TABLE bantochuc (
    mabtc INT AUTO_INCREMENT PRIMARY KEY,
    tenbtc VARCHAR(255) NOT NULL,
    usernamebtc VARCHAR(50) UNIQUE,
    passwordbtc VARCHAR(255) NOT NULL,
);
CREATE TABLE kyyeu (
    maky INT AUTO_INCREMENT PRIMARY KEY,
    tenky VARCHAR(255) NOT NULL
);

CREATE TABLE hoithao (
    maht INT AUTO_INCREMENT PRIMARY KEY,
    tenhoithao VARCHAR(255) NOT NULL,
    diachi VARCHAR(255),
    tintuc TEXT,
    ngaytochuc DATE,
    thoigian TIME,
    hinhthuctochuc VARCHAR(100),
    mabtc INT UNIQUE,
    maky INT UNIQUE,
    CONSTRAINT fk_hoithao_bantochuc FOREIGN KEY (mabtc) REFERENCES bantochuc(mabtc) ON DELETE SET NULL,
    CONSTRAINT fk_hoithao_kyyeu FOREIGN KEY (maky) REFERENCES kyyeu(maky) ON DELETE SET NULL
);

CREATE TABLE hoithao_baibao (
    maht INT,
    mabaibao INT,
    PRIMARY KEY (maht, mabaibao),
    FOREIGN KEY (maht) REFERENCES hoithao(maht) ON DELETE CASCADE,
    FOREIGN KEY (mabaibao) REFERENCES baibao(mabaibao) ON DELETE CASCADE
);

CREATE TABLE phieunhanxet (
    maphieuncx INT AUTO_INCREMENT PRIMARY KEY,
    id_user INT NOT NULL,
    mabaibao INT NOT NULL,
    noidung TEXT NOT NULL,
    ngaynhanxet DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_user) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (mabaibao) REFERENCES baibao(mabaibao) ON DELETE CASCADE
);
CREATE TABLE chitiet_phieunhanxet (
    machitiet INT AUTO_INCREMENT PRIMARY KEY,
    maphieuncx INT NOT NULL,
    ketqua VARCHAR(255) NOT NULL,
    FOREIGN KEY (maphieuncx) REFERENCES phieunhanxet(maphieuncx) ON DELETE CASCADE
);
CREATE TABLE phancong_phanbien (
    maphancong INT AUTO_INCREMENT PRIMARY KEY,
    mabaibao INT NOT NULL,
    id_user INT NOT NULL,  -- reviewer
    mapbtc INT NOT NULL,   -- ban tổ chức phân công
    ngayphancong DATEtime DEFAULT CURRENT_TIMESTAMP,
    trangthai ENUM('dang_phanbien', 'hoan_thanh', 'huy') DEFAULT 'dang_phanbien',

    FOREIGN KEY (mabaibao) REFERENCES baibao(mabaibao) ON DELETE CASCADE,
    FOREIGN KEY (id_user) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (mapbtc) REFERENCES bantochuc(mabtc) ON DELETE CASCADE,

    UNIQUE KEY unique_phancong (mabaibao, id_user)  -- mỗi user chỉ phản biện 1 lần cho 1 bài báo
);




