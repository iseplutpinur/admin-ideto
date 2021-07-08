-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 08, 2021 at 10:58 PM
-- Server version: 10.4.18-MariaDB
-- PHP Version: 7.4.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Database: `ideto`
--

-- --------------------------------------------------------

--
-- Table structure for table `informasi`
--

CREATE TABLE `informasi` (
  `id` int(11) NOT NULL,
  `id_kategori` int(11) DEFAULT NULL,
  `judul` varchar(250) DEFAULT NULL,
  `deskripsi` text DEFAULT NULL,
  `gambar` varchar(250) DEFAULT NULL,
  `penulis` varchar(100) DEFAULT NULL,
  `status` int(11) DEFAULT 1,
  `tanggal` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `kategori`
--

CREATE TABLE `kategori` (
  `id` int(11) NOT NULL,
  `nama` varchar(100) DEFAULT NULL,
  `tanggal` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `konten_about_ideto`
--

CREATE TABLE `konten_about_ideto` (
  `id` int(11) NOT NULL,
  `slider_judul` varchar(100) DEFAULT NULL,
  `slider_deskripsi` text DEFAULT NULL,
  `profil_judul` varchar(100) DEFAULT NULL,
  `profil_deskripsi` text DEFAULT NULL,
  `profil_gambar` varchar(250) DEFAULT NULL,
  `sejarah_judul` varchar(100) DEFAULT NULL,
  `sejarah_deskripsi` text DEFAULT NULL,
  `sejarah_gambar` varchar(250) DEFAULT NULL,
  `tanggal` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `konten_about_ideto`
--

INSERT INTO `konten_about_ideto` (`id`, `slider_judul`, `slider_deskripsi`, `profil_judul`, `profil_deskripsi`, `profil_gambar`, `sejarah_judul`, `sejarah_deskripsi`, `sejarah_gambar`, `tanggal`) VALUES
(1, 'Profile', 'Lorem', 'Profile judul', '<p><span xss=\"removed\" style=\"font-size: 24px;\">&nbsp;Testing 123 12</span><span style=\"font-size: 24px;\">﻿</span><br><img src=\"http://localhost/aplikasi/pro/ideto/images/about/ideto/bajay1.png\" alt=\"bajay1.png\" style=\"width: 25%; float: right;\" class=\"note-float-right\"></p>', NULL, 'Sejarah judul', '<p>123</p>', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `konten_about_kebijakan`
--

CREATE TABLE `konten_about_kebijakan` (
  `id` int(11) NOT NULL,
  `slider_judul` varchar(100) DEFAULT NULL,
  `slider_deskripsi` text DEFAULT NULL,
  `judul_1` varchar(100) DEFAULT NULL,
  `deskripsi_1` text DEFAULT NULL,
  `gambar_1` varchar(100) DEFAULT NULL,
  `judul_2` varchar(100) DEFAULT NULL,
  `deskripsi_2` text DEFAULT NULL,
  `gambar_2` varchar(100) DEFAULT NULL,
  `judul_3` varchar(100) DEFAULT NULL,
  `deskripsi_3` text DEFAULT NULL,
  `gambar_3` varchar(100) DEFAULT NULL,
  `judul_4` varchar(100) DEFAULT NULL,
  `deskripsi_4` text DEFAULT NULL,
  `gambar_4` varchar(100) DEFAULT NULL,
  `judul_5` varchar(100) DEFAULT NULL,
  `deskripsi_5` text DEFAULT NULL,
  `gambar_5` varchar(100) DEFAULT NULL,
  `judul_6` varchar(100) DEFAULT NULL,
  `deskripsi_6` text DEFAULT NULL,
  `gambar_6` varchar(100) DEFAULT NULL,
  `judul_7` varchar(100) DEFAULT NULL,
  `deskripsi_7` text DEFAULT NULL,
  `gambar_7` varchar(100) DEFAULT NULL,
  `tanggal` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `konten_about_lain_lain`
--

CREATE TABLE `konten_about_lain_lain` (
  `id` int(11) NOT NULL,
  `slider_judul` varchar(100) DEFAULT NULL,
  `slider_deskripsi` text DEFAULT NULL,
  `judul_1` varchar(100) DEFAULT NULL,
  `deskripsi_1` text DEFAULT NULL,
  `gambar_1` varchar(100) DEFAULT NULL,
  `judul_2` varchar(100) DEFAULT NULL,
  `deskripsi_2` text DEFAULT NULL,
  `gambar_2` varchar(100) DEFAULT NULL,
  `judul_3` varchar(100) DEFAULT NULL,
  `deskripsi_3` text DEFAULT NULL,
  `gambar_3` varchar(100) DEFAULT NULL,
  `judul_4` varchar(100) DEFAULT NULL,
  `deskripsi_4` text DEFAULT NULL,
  `gambar_4` varchar(100) DEFAULT NULL,
  `tanggal` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `konten_about_penata_laksana`
--

CREATE TABLE `konten_about_penata_laksana` (
  `id` int(11) NOT NULL,
  `slider_judul` varchar(100) DEFAULT NULL,
  `slider_deskripsi` text DEFAULT NULL,
  `tanggal` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `konten_about_penyerahan`
--

CREATE TABLE `konten_about_penyerahan` (
  `id` int(11) NOT NULL,
  `slider_judul` varchar(100) DEFAULT NULL,
  `slider_deskripsi` text DEFAULT NULL,
  `judul_1` varchar(100) DEFAULT NULL,
  `deskripsi_1` text DEFAULT NULL,
  `gambar_1` varchar(100) DEFAULT NULL,
  `judul_2` varchar(100) DEFAULT NULL,
  `deskripsi_2` text DEFAULT NULL,
  `gambar_2` varchar(100) DEFAULT NULL,
  `judul_3` varchar(100) DEFAULT NULL,
  `deskripsi_3` text DEFAULT NULL,
  `gambar_3` varchar(100) DEFAULT NULL,
  `judul_4` varchar(100) DEFAULT NULL,
  `deskripsi_4` text DEFAULT NULL,
  `gambar_4` varchar(100) DEFAULT NULL,
  `judul_5` varchar(100) DEFAULT NULL,
  `deskripsi_5` text DEFAULT NULL,
  `gambar_5` varchar(100) DEFAULT NULL,
  `judul_6` varchar(100) DEFAULT NULL,
  `deskripsi_6` text DEFAULT NULL,
  `gambar_6` varchar(100) DEFAULT NULL,
  `tanggal` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `konten_arsip`
--

CREATE TABLE `konten_arsip` (
  `id` int(11) NOT NULL,
  `slider_judul` varchar(100) DEFAULT NULL,
  `slider_deskripsi` text DEFAULT NULL,
  `tanggal` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `konten_artikel`
--

CREATE TABLE `konten_artikel` (
  `id` int(11) NOT NULL,
  `slider_judul` varchar(100) DEFAULT NULL,
  `slider_deskripsi` text DEFAULT NULL,
  `tanggal` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `konten_home`
--

CREATE TABLE `konten_home` (
  `id` int(11) NOT NULL,
  `slider_judul` varchar(100) DEFAULT NULL,
  `slider_deskripsi` text DEFAULT NULL,
  `slider_gambar` varchar(250) DEFAULT NULL,
  `informasi_judul` varchar(100) DEFAULT NULL,
  `informasi_deskripsi` text DEFAULT NULL,
  `informasi_gambar` varchar(250) DEFAULT NULL,
  `tanggal` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `konten_informasi`
--

CREATE TABLE `konten_informasi` (
  `id` int(11) NOT NULL,
  `slider_judul` varchar(100) DEFAULT NULL,
  `slider_deskripsi` text DEFAULT NULL,
  `tanggal` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `konten_pencarian`
--

CREATE TABLE `konten_pencarian` (
  `id` int(11) NOT NULL,
  `slider_judul` varchar(100) DEFAULT NULL,
  `slider_deskripsi` text DEFAULT NULL,
  `tanggal` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `konten_utama`
--

CREATE TABLE `konten_utama` (
  `id` int(11) NOT NULL,
  `nama_aplikasi` varchar(100) DEFAULT NULL,
  `tentang_aplikasi` text DEFAULT NULL,
  `kata_pencarian` text DEFAULT NULL,
  `link` varchar(100) DEFAULT NULL,
  `copyright` varchar(100) DEFAULT NULL,
  `tanggal` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `level`
--

CREATE TABLE `level` (
  `lev_id` int(11) NOT NULL,
  `lev_nama` varchar(50) NOT NULL,
  `lev_keterangan` text NOT NULL,
  `lev_status` varchar(50) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `level`
--

INSERT INTO `level` (`lev_id`, `lev_nama`, `lev_keterangan`, `lev_status`, `created_at`) VALUES
(1, 'Administrator', '-', 'Aktif', '2020-06-18 09:40:31');

-- --------------------------------------------------------

--
-- Table structure for table `menu`
--

CREATE TABLE `menu` (
  `menu_id` int(11) NOT NULL,
  `menu_menu_id` int(11) NOT NULL,
  `menu_nama` varchar(50) NOT NULL,
  `menu_keterangan` text NOT NULL,
  `menu_index` int(11) NOT NULL,
  `menu_icon` varchar(50) NOT NULL,
  `menu_url` varchar(100) NOT NULL,
  `menu_status` varchar(50) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `menu`
--

INSERT INTO `menu` (`menu_id`, `menu_menu_id`, `menu_nama`, `menu_keterangan`, `menu_index`, `menu_icon`, `menu_url`, `menu_status`, `created_at`) VALUES
(1, 0, 'Dashboard', '-', 1, 'fa fa-suitcase', 'dashboard', 'Aktif', '2020-06-18 09:40:07'),
(2, 0, 'Pengaturan', '-', 10, 'fa fa-cogs', '#', 'Aktif', '2020-06-18 09:40:07'),
(3, 2, 'Hak Akses', '-', 1, 'far fa-circle', 'pengaturan/hakAkses', 'Aktif', '2020-06-18 09:40:07'),
(4, 2, 'Menu', '-', 2, 'far fa-circle', 'pengaturan/menu', 'Aktif', '2020-06-18 09:40:07'),
(5, 2, 'Level', '-', 3, 'far fa-circle', 'pengaturan/level', 'Aktif', '2020-06-18 09:40:07'),
(6, 2, 'Pengguna', '-', 4, 'far fa-circle', 'pengaturan/pengguna', 'Aktif', '2020-06-18 09:40:07'),
(64, 0, 'Ganti Password', 'Ganti password', 99, 'fa fa-key', 'pengaturan/password', 'Aktif', '2021-06-28 15:34:14'),
(69, 0, 'About', '-', 2, 'fas fa-address-card', '#', 'Aktif', '2021-07-08 13:38:35'),
(70, 69, 'Ideto', '-', 1, ' far fa-circle', 'about/ideto', 'Aktif', '2021-07-08 13:42:47'),
(71, 69, 'Penata Laksana', '-', 2, 'far fa-circle', 'about/penatalaksana', 'Aktif', '2021-07-08 13:44:03'),
(72, 69, 'Penyerahan', '-', 4, 'far fa-circle', 'about/penyerahan', 'Aktif', '2021-07-08 13:45:10'),
(73, 69, 'Kebijakan', '-', 3, 'far fa-circle', 'about/kebijakan', 'Aktif', '2021-07-08 13:46:11'),
(74, 69, 'Lain-Lain', '-', 5, 'far fa-circle', 'about/lainlain', 'Aktif', '2021-07-08 13:46:36');

-- --------------------------------------------------------

--
-- Table structure for table `pengguna`
--

CREATE TABLE `pengguna` (
  `id` int(11) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(250) DEFAULT NULL,
  `nama_lengkap` varchar(100) DEFAULT NULL,
  `nama_panggilan` varchar(100) DEFAULT NULL,
  `tanggal_lahir` date DEFAULT NULL,
  `jenis_kelamin` varchar(20) DEFAULT NULL,
  `alamat` text DEFAULT NULL,
  `strata_pendidikan` varchar(100) DEFAULT NULL,
  `instansi` varchar(100) DEFAULT NULL,
  `nomor_hp` varchar(20) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `tanggal` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `role_aplikasi`
--

CREATE TABLE `role_aplikasi` (
  `rola_id` int(11) NOT NULL,
  `rola_menu_id` int(11) NOT NULL,
  `rola_lev_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `role_aplikasi`
--

INSERT INTO `role_aplikasi` (`rola_id`, `rola_menu_id`, `rola_lev_id`, `created_at`) VALUES
(97, 1, 1, '2021-07-07 23:00:32'),
(98, 3, 1, '2021-07-07 23:00:44'),
(99, 4, 1, '2021-07-07 23:00:51'),
(100, 5, 1, '2021-07-07 23:00:57'),
(101, 6, 1, '2021-07-07 23:01:00'),
(102, 64, 1, '2021-07-07 23:01:04'),
(103, 2, 1, '2021-07-07 23:01:26'),
(104, 69, 1, '2021-07-08 13:38:44'),
(105, 70, 1, '2021-07-08 13:48:17'),
(106, 71, 1, '2021-07-08 13:48:24'),
(107, 72, 1, '2021-07-08 13:48:31'),
(109, 73, 1, '2021-07-08 13:49:21'),
(110, 74, 1, '2021-07-08 13:49:32');

-- --------------------------------------------------------

--
-- Table structure for table `role_users`
--

CREATE TABLE `role_users` (
  `role_id` int(11) NOT NULL,
  `role_user_id` int(11) NOT NULL,
  `role_lev_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `role_users`
--

INSERT INTO `role_users` (`role_id`, `role_user_id`, `role_lev_id`, `created_at`) VALUES
(1, 1, 1, '2020-06-18 09:39:26'),
(338, 336, 1, '2021-07-07 23:38:14'),
(339, 337, 1, '2021-07-07 23:38:57');

-- --------------------------------------------------------

--
-- Table structure for table `tokens`
--

CREATE TABLE `tokens` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED DEFAULT NULL,
  `token` varchar(255) NOT NULL,
  `type` varchar(80) NOT NULL,
  `is_revoked` tinyint(1) DEFAULT 0,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `user_nama` varchar(50) NOT NULL,
  `user_password` varchar(100) NOT NULL,
  `user_email` varchar(50) NOT NULL,
  `user_phone` varchar(15) NOT NULL,
  `user_status` varchar(50) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `user_nama`, `user_password`, `user_email`, `user_phone`, `user_status`, `created_at`, `updated_at`) VALUES
(1, 'Admin Pusat', '$2y$10$gp.46.UzygRVbGZTyzDZ6eZrMQ1q4jBhQtQSsWafE7vO3e50CfOqu', 'administrator@gmail.com', '08123123', 'Aktif', '2020-06-18 09:39:08', '2020-06-18 09:39:08'),
(336, 'sdafsdf', '$2y$10$PV2NsX9xL8bnbWBEA5rvnOb4SLO6HLwH8038BGHBFLZJchISA/oTi', '123', '1123', 'Aktif', '2021-07-07 23:38:14', '0000-00-00 00:00:00'),
(337, '123456', '$2y$10$mTU6yyDkqF4onkdbHFgtm.Cc/6700J.F0U1ki8.QwbxQOPXRrbfjC', 'iseplutpi@gmail.com', '1111', 'Aktif', '2021-07-07 23:38:57', '0000-00-00 00:00:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `informasi`
--
ALTER TABLE `informasi`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `kategori`
--
ALTER TABLE `kategori`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `konten_about_ideto`
--
ALTER TABLE `konten_about_ideto`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `konten_about_kebijakan`
--
ALTER TABLE `konten_about_kebijakan`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `konten_about_lain_lain`
--
ALTER TABLE `konten_about_lain_lain`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `konten_about_penata_laksana`
--
ALTER TABLE `konten_about_penata_laksana`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `konten_about_penyerahan`
--
ALTER TABLE `konten_about_penyerahan`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `konten_arsip`
--
ALTER TABLE `konten_arsip`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `konten_artikel`
--
ALTER TABLE `konten_artikel`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `konten_home`
--
ALTER TABLE `konten_home`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `konten_informasi`
--
ALTER TABLE `konten_informasi`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `konten_pencarian`
--
ALTER TABLE `konten_pencarian`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `konten_utama`
--
ALTER TABLE `konten_utama`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `level`
--
ALTER TABLE `level`
  ADD PRIMARY KEY (`lev_id`);

--
-- Indexes for table `menu`
--
ALTER TABLE `menu`
  ADD PRIMARY KEY (`menu_id`);

--
-- Indexes for table `pengguna`
--
ALTER TABLE `pengguna`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `role_aplikasi`
--
ALTER TABLE `role_aplikasi`
  ADD PRIMARY KEY (`rola_id`);

--
-- Indexes for table `role_users`
--
ALTER TABLE `role_users`
  ADD PRIMARY KEY (`role_id`);

--
-- Indexes for table `tokens`
--
ALTER TABLE `tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `tokens_token_unique` (`token`),
  ADD KEY `tokens_user_id_foreign` (`user_id`),
  ADD KEY `tokens_token_index` (`token`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `informasi`
--
ALTER TABLE `informasi`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `kategori`
--
ALTER TABLE `kategori`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `konten_about_ideto`
--
ALTER TABLE `konten_about_ideto`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `konten_about_kebijakan`
--
ALTER TABLE `konten_about_kebijakan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `konten_about_lain_lain`
--
ALTER TABLE `konten_about_lain_lain`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `konten_about_penata_laksana`
--
ALTER TABLE `konten_about_penata_laksana`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `konten_about_penyerahan`
--
ALTER TABLE `konten_about_penyerahan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `konten_arsip`
--
ALTER TABLE `konten_arsip`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `konten_artikel`
--
ALTER TABLE `konten_artikel`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `konten_home`
--
ALTER TABLE `konten_home`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `konten_informasi`
--
ALTER TABLE `konten_informasi`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `konten_pencarian`
--
ALTER TABLE `konten_pencarian`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `konten_utama`
--
ALTER TABLE `konten_utama`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `level`
--
ALTER TABLE `level`
  MODIFY `lev_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `menu`
--
ALTER TABLE `menu`
  MODIFY `menu_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=75;

--
-- AUTO_INCREMENT for table `pengguna`
--
ALTER TABLE `pengguna`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `role_aplikasi`
--
ALTER TABLE `role_aplikasi`
  MODIFY `rola_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=111;

--
-- AUTO_INCREMENT for table `role_users`
--
ALTER TABLE `role_users`
  MODIFY `role_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=340;

--
-- AUTO_INCREMENT for table `tokens`
--
ALTER TABLE `tokens`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=169;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=338;
COMMIT;
