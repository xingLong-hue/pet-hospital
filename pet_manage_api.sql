/*
Navicat MySQL Data Transfer

Source Server         : MySQL57
Source Server Version : 80024
Source Host           : localhost:3306
Source Database       : pet_manage_api

Target Server Type    : MYSQL
Target Server Version : 80024
File Encoding         : 65001

Date: 2023-02-21 16:36:30
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `app_users`
-- ----------------------------
DROP TABLE IF EXISTS `app_users`;
CREATE TABLE `app_users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nickname` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `username` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `password` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `phone` varchar(35) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `email` varchar(35) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `sex` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `address` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `role` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `petname` varchar(255) DEFAULT NULL,
  `headphoto` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=86 DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Records of app_users
-- ----------------------------
INSERT INTO `app_users` VALUES ('2', '第一个', '66666', '123', '18378555125', 'qweq@qq.com', '男', '甘肃贵州安娜', '普通用户', '哈哈', 'http://127.0.0.1:3000/avar_1649497197433-8039568804072752.png');
INSERT INTO `app_users` VALUES ('62', '勇敢牛牛', 'longge', '123456789', '18378555259', '2581582333@qq.com', '男', '贵港', '普通用户', '小马', 'http://127.0.0.1:3000/avar_1649497197433-8039568804072752.png');
INSERT INTO `app_users` VALUES ('72', '牛牛惹', '老王', '123456', '13675827391', '2581582333@qq.com', '男', '南宁', '普通用户', '阿拉斯加', 'http://127.0.0.1:3000/avar_1650456335735-5243213308938981.jpg');
INSERT INTO `app_users` VALUES ('75', '吃不胖的崽', 'admin', '123', '18378555259', '2581582333@qq.com', '男', '贵港', '普通用户', '二哈', 'http://127.0.0.1:3000/avar_1650454819360-6885496905980473.jpg');
INSERT INTO `app_users` VALUES ('84', null, 'zsd', '123', '18378555259', '2581582333@qq.com', '男', null, null, null, null);
INSERT INTO `app_users` VALUES ('85', null, '王小五', '123456', null, '123456@qq.com', '男', null, null, null, null);

-- ----------------------------
-- Table structure for `dakamsg`
-- ----------------------------
DROP TABLE IF EXISTS `dakamsg`;
CREATE TABLE `dakamsg` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `zhiwei` varchar(255) DEFAULT NULL,
  `keshi` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Records of dakamsg
-- ----------------------------
INSERT INTO `dakamsg` VALUES ('15', '啊啊啊', null, null, '已打卡', '2022-04-13 00:00:00');
INSERT INTO `dakamsg` VALUES ('21', 'tt', null, null, '已打卡', '2022-04-19 00:00:00');
INSERT INTO `dakamsg` VALUES ('45', 'lisi', null, null, '已打卡', '2022-05-21 00:00:00');
INSERT INTO `dakamsg` VALUES ('46', '赵晓芳', null, null, null, null);

-- ----------------------------
-- Table structure for `danganmsg`
-- ----------------------------
DROP TABLE IF EXISTS `danganmsg`;
CREATE TABLE `danganmsg` (
  `id` int NOT NULL AUTO_INCREMENT,
  `petname` varchar(255) DEFAULT NULL,
  `photoUrl` varchar(255) DEFAULT NULL,
  `petusername` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `history` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Records of danganmsg
-- ----------------------------
INSERT INTO `danganmsg` VALUES ('3', '小狗', 'https://img2.baidu.com/it/u=126242931,1163583975&fm=253&fmt=auto&app=138&f=JPEG?w=300&h=300', '阿斯达', '4135511', '无');
INSERT INTO `danganmsg` VALUES ('4', '小白', 'https://img0.baidu.com/it/u=3093686552,2032356194&fm=253&fmt=auto&app=138&f=JPEG?w=300&h=205', 'longge', '97895116', '无');
INSERT INTO `danganmsg` VALUES ('5', '123', 'https://img0.baidu.com/it/u=3093686552,2032356194&fm=253&fmt=auto&app=138&f=JPEG?w=300&h=205', '老王', '123', '123');
INSERT INTO `danganmsg` VALUES ('6', '二哈1', 'http://127.0.0.1:3000/pet_1650525992162-5322907311589951.jpg', '123', '13657828710', '无');
INSERT INTO `danganmsg` VALUES ('7', null, null, 'lisi', null, null);
INSERT INTO `danganmsg` VALUES ('8', '柯基', 'http://127.0.0.1:3000/pet_1653110646918-994813843637868.jpg', 'admin', '18378555259', '无');
INSERT INTO `danganmsg` VALUES ('10', null, null, 'asd', null, null);
INSERT INTO `danganmsg` VALUES ('11', null, null, 'qwe', null, null);
INSERT INTO `danganmsg` VALUES ('12', '柯基', 'http://127.0.0.1:3000/pet_1653119152841-7950266856532797.jpg', 'zsd', '18378555259', '无');

-- ----------------------------
-- Table structure for `doctorlistmsg`
-- ----------------------------
DROP TABLE IF EXISTS `doctorlistmsg`;
CREATE TABLE `doctorlistmsg` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `age` varchar(255) DEFAULT NULL,
  `sex` varchar(255) DEFAULT NULL,
  `ke_shi` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `zhi_wei` varchar(255) DEFAULT NULL,
  `shan_chang` varchar(255) DEFAULT NULL,
  `detail` varchar(255) DEFAULT NULL,
  `keshi_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `wai_jian` (`keshi_id`),
  KEY `username` (`username`),
  CONSTRAINT `wai_jian` FOREIGN KEY (`keshi_id`) REFERENCES `keshimsg` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=69 DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Records of doctorlistmsg
-- ----------------------------
INSERT INTO `doctorlistmsg` VALUES ('2', '杜福尔', '56', '男', '骨科', '13657828710', null, '医师', '接骨', '暂无', '3');
INSERT INTO `doctorlistmsg` VALUES ('3', '李清玲', '35', '女', '内科', '2114214196', null, '医师', '心脏检查', '暂无', '4');
INSERT INTO `doctorlistmsg` VALUES ('4', '简文涛', '34', '男', '猫专科', '1241414889', null, '医师', '阿萨法', '广西医科大学博士生毕业，2015在美国进修猫专科方面的治疗', '3');
INSERT INTO `doctorlistmsg` VALUES ('5', '宋静玲', '18', '女', '外科', '3423423470', null, '医生师', '接生', '暂无', '4');
INSERT INTO `doctorlistmsg` VALUES ('6', '钱大伟', '35', '男', '骨科', '1141442354', null, '副院长', '大会', '暂无', '3');
INSERT INTO `doctorlistmsg` VALUES ('7', '张文泽', '40', '男', '牙科', '3215467778', null, '主任医师', '清洁牙，拔牙', '武汉医科大学博士生毕业', '5');
INSERT INTO `doctorlistmsg` VALUES ('8', '李芳', '35', '女', '内分泌科', '1564893775', null, '副主任医师', '调理代谢，糖尿病', '暂无', '6');
INSERT INTO `doctorlistmsg` VALUES ('9', '郑美', '30', '女', '影像科', '1365824972', null, '医师', '精准判读影响结果，及医疗建议', '南京医科大学博士生毕业', '7');
INSERT INTO `doctorlistmsg` VALUES ('10', '刘慧', '28', '女', '皮肤科', '1378654230', null, '医师', '治疗因皮肤产生的各种问题，如螨虫，真菌性皮肤病等', '暂无', '10');
INSERT INTO `doctorlistmsg` VALUES ('11', '关辉', '33', '男', '肿瘤科', '1456879271', null, '主任医师', '阻断切除肿瘤，及治疗', '广东医科大学博士生毕业', '9');
INSERT INTO `doctorlistmsg` VALUES ('12', '孔芳芳', '32', '女', '心脏科', '1645239877', null, '医师', '检查心脏疾病问题，及医疗求治', '暂无', '8');
INSERT INTO `doctorlistmsg` VALUES ('13', '李菲', '25', '女', '软组织外科', '1356498783', null, '医师', '消肿，包扎，康复训练', '广西桂林医学院毕业', '2');
INSERT INTO `doctorlistmsg` VALUES ('14', '邓和泉', '37', '男', '影像科', '1568936206', null, '医师', '精准摄像受伤部位，并给予医疗建议', '暂无', '7');
INSERT INTO `doctorlistmsg` VALUES ('15', '阚福德', '45', '男', '内分泌科', '1786459306', null, '副主任医师', '主治糖尿病，代谢混乱', '广西医科大学博士生毕业', '6');
INSERT INTO `doctorlistmsg` VALUES ('16', '覃芙兰', '36', '女', '牙科 ', '1564923578', null, '医师', '主治牙的问题，拔牙，洁牙，补牙', '暂无', '5');
INSERT INTO `doctorlistmsg` VALUES ('17', '尚官美', '41', '女', '肿瘤科', '1568795365', null, '医师', '切除肿瘤手术，阻断肿瘤生长，及治疗康复', '暂无', '9');
INSERT INTO `doctorlistmsg` VALUES ('18', '雷美娜', '35', '女', '皮肤科', '1785896367', null, '医师', '主治常见的皮肤问题，螨虫皮肤疾病等', '云南医科大学毕业', '10');
INSERT INTO `doctorlistmsg` VALUES ('19', '李德发', '30', '男', '心脏科', '1657839456', null, '医师', '主治心脏疾病问题', '暂无', '8');
INSERT INTO `doctorlistmsg` VALUES ('56', '小芳', '女', '19', '外科', '18378555289', null, '医师', '止血', null, null);
INSERT INTO `doctorlistmsg` VALUES ('68', '赵晓芳', null, '男', null, null, null, null, null, null, null);

-- ----------------------------
-- Table structure for `doctor_users`
-- ----------------------------
DROP TABLE IF EXISTS `doctor_users`;
CREATE TABLE `doctor_users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nickname` varchar(20) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `username` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `age` int DEFAULT NULL,
  `sex` varchar(20) DEFAULT NULL,
  `zhi_wei` varchar(30) DEFAULT NULL,
  `ke_shi` varchar(35) DEFAULT NULL,
  `phone` varchar(80) DEFAULT NULL,
  `address` varchar(120) DEFAULT NULL,
  `email` varchar(80) DEFAULT NULL,
  `role` varchar(30) DEFAULT NULL,
  `headphoto` varchar(2000) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Records of doctor_users
-- ----------------------------
INSERT INTO `doctor_users` VALUES ('1', '哈哈哈', '123456', 'lisi', '35', '女', '主治医师', '骨科', '13657828712', '南京浦东', '7793@qq.com', '医生', 'http://127.0.0.1:3000/pet_1649746388212-5220943997769878.jpg');
INSERT INTO `doctor_users` VALUES ('2', '我的王子', '11111', 'zhangsan', '36', '男', '主任医师', '内科', '1146136', '湖北武汉', 'lkj@qq.com', '医生', 'http://127.0.0.1:3000/pet_1649755670631-19598810209834738.jpg');
INSERT INTO `doctor_users` VALUES ('30', '阿888', '111', '啊啊啊', '29', '男', '医师', '骨科', '18978555259', '贵港', '2333@qq.com', '医生', 'http://127.0.0.1:3000/pet_1649757771602-134346053833569.jpg');
INSERT INTO `doctor_users` VALUES ('49', '你好', '123456', 'tt', null, '男', null, null, '185226974', '柳州', '2581582333@qq.com', '医师', null);
INSERT INTO `doctor_users` VALUES ('50', '我哈', '123', '隆哥', null, '男', null, null, '18378555259', '桂林', '2581582333@qq.com', '医师', null);
INSERT INTO `doctor_users` VALUES ('56', '祖达萨', '123', '爱仕达多', null, '1', null, null, '123', '123', '123', '123', null);
INSERT INTO `doctor_users` VALUES ('60', null, '123456', '赵晓芳', null, '男', null, null, null, null, '123456@qq.com', '医师', null);

-- ----------------------------
-- Table structure for `gonggaomsg`
-- ----------------------------
DROP TABLE IF EXISTS `gonggaomsg`;
CREATE TABLE `gonggaomsg` (
  `id` int NOT NULL AUTO_INCREMENT,
  `time` datetime DEFAULT NULL,
  `tit` varchar(1000) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `miaoshu` varchar(20000) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Records of gonggaomsg
-- ----------------------------
INSERT INTO `gonggaomsg` VALUES ('1', '2022-03-17 13:12:01', '新职位招聘', '招聘岗位需求');
INSERT INTO `gonggaomsg` VALUES ('2', '2022-03-17 21:02:58', '公众号迁移', '由于旧的号管理上出了障碍，因此使用新的账号，如有需要请关注新的好------卡号开发好卡');
INSERT INTO `gonggaomsg` VALUES ('3', '2022-03-18 22:05:30', '医院新建楼栋征文工程', '基于医院资源有限，现拟要新建一栋医院治疗楼，请有意愿承包的工程公司联系我院，联系方式：156785694');

-- ----------------------------
-- Table structure for `guahaomsg`
-- ----------------------------
DROP TABLE IF EXISTS `guahaomsg`;
CREATE TABLE `guahaomsg` (
  `id` int NOT NULL AUTO_INCREMENT,
  `petname` varchar(255) DEFAULT NULL,
  `petuser` varchar(255) DEFAULT NULL,
  `petuser_tel` varchar(255) DEFAULT NULL,
  `history` varchar(255) DEFAULT NULL,
  `guahao_keshi` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `doctor` varchar(255) DEFAULT NULL,
  `guahaoTime` datetime DEFAULT NULL,
  `daytime` varchar(255) DEFAULT NULL,
  `time_duan` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Records of guahaomsg
-- ----------------------------
INSERT INTO `guahaomsg` VALUES ('18', '嘻嘻', 'admin', '123456789', null, '软组织外科', '李菲', '2022-03-25 00:00:00', '下午', '17:00-18:00');
INSERT INTO `guahaomsg` VALUES ('19', '小狗', '阿斯达', '123', null, '内科', '宋静玲', '2022-03-29 00:00:00', '上午', '8:00-9:00');
INSERT INTO `guahaomsg` VALUES ('20', 'null', 'zjl', '15928421554', null, '内科', '宋静玲', '2022-04-27 00:00:00', '下午', '9:00-10:00');
INSERT INTO `guahaomsg` VALUES ('21', 'null', '123', '123', null, '软组织外科', '李菲', '2022-04-21 00:00:00', '下午', '9:00-10:00');
INSERT INTO `guahaomsg` VALUES ('22', '二哈', 'admin', '18378555259', null, '软组织外科', '李菲', '2022-05-19 00:00:00', '下午', '17:00-18:00');
INSERT INTO `guahaomsg` VALUES ('23', 'null', 'zsd', '18378555259', null, '骨科', '简文涛', '2022-05-21 00:00:00', '下午', '17:00-18:00');

-- ----------------------------
-- Table structure for `hospitalintroduce`
-- ----------------------------
DROP TABLE IF EXISTS `hospitalintroduce`;
CREATE TABLE `hospitalintroduce` (
  `id` int NOT NULL,
  `name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `tel` varchar(200) DEFAULT NULL,
  `address` varchar(3000) DEFAULT NULL,
  `introduce` varchar(15555) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Records of hospitalintroduce
-- ----------------------------
INSERT INTO `hospitalintroduce` VALUES ('1', '乖乖医院', '0775-456987', '广西贵港市港北区大圩金盆街道168号', '益宠宠物医院是一家长期致力于推动中国宠物医疗事业发展的专业宠物医院连锁品牌。益宠宠物医院本着“因为严谨、所以安心”的宗旨，拥有数十载宠物行业管理经营经验，把宠物当家人，为爱宠提供全面、科学、透明的医疗服务，重新定义每个小生命的尊严和价值。我们的服务涵盖专业动物医学诊疗、宠物基础免疫和驱虫、体检保健、健康美容等众多领域，以“家人”般的呵护，将服务做到贴心与专业，为爱宠提供人性化、高品质的健康服务体验。三甲医院');

-- ----------------------------
-- Table structure for `keshimsg`
-- ----------------------------
DROP TABLE IF EXISTS `keshimsg`;
CREATE TABLE `keshimsg` (
  `id` int NOT NULL AUTO_INCREMENT,
  `keshi` varchar(255) DEFAULT NULL,
  `keshi_desc` varchar(10255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Records of keshimsg
-- ----------------------------
INSERT INTO `keshimsg` VALUES ('1', '猫专科', '安安宠医是国内先进的猫专科服务连锁医院，按照国际标准建立猫诊所，以猫为本，致力于减少猫咪到诊所而导致的应激，也让猫主人拜访宠物医生变得更容易更舒适。猫专用诊室和候诊区，“无犬环境”，隔绝噪音打扰，更温和就诊体验。猫专用住院部，单独笼位，复式设计，实现一室一厅一卫，更宽敞舒适的活动空间。猫寄养乐园，分豪华玻璃笼位和散放笼位，与猫乐园无缝连接，活动时间单独出来玩耍，满足瞄星人上下跳跃的需求。');
INSERT INTO `keshimsg` VALUES ('2', '软组织外科', '软组织是与其他身体部分和器官相连、支撑或包围的组织。此外，软组织包括腱、韧带、膜、纤维组织、脂肪、滑膜、肌肉、神经和血管。故此，医治软组织疾病可能须要做手术，比如常见的软组织手术、尿道造口术、会阴疝修补术。\n');
INSERT INTO `keshimsg` VALUES ('3', '骨科', '伴随着宠物走入人们的身边，宠物已经成为家庭的一员，车祸、咬伤、高空坠落造成的骨折病例在临床上也逐渐增多，骨折发生后，宠物主人愿意让宠物接受好的治疗。安安拥有从事小动物骨科手术多年的骨科宠物专家队伍，掌握高超的诊疗技术，引进先进的仪器设备，所有的患病动物都会在恒温手术台，无菌手术室被细心检查,并进行术前的血液生化和血液分析检查，及时发现宠物的各种功能变化，对手术麻醉提供科学的依据，麻醉用药均为进口麻药或呼吸麻醉使用，根据爱宠的实际情况来选用。\n');
INSERT INTO `keshimsg` VALUES ('4', '内科', '包括脏器心、肝、脾、肺、肾都在宠物内科体检范围之内，借助完整的专业检测设备，如生化分析仪、内分泌分析仪、超声仪、数位化X射线、核磁共振等，并与其他科室如心脏科、神经科、影像科、肿瘤科的协同会诊提供强大的内科支持。对于呼吸道、消化道、泌尿系统、老年综合性疾病等方面的诊断与治疗有著丰富的经验与专业素养');
INSERT INTO `keshimsg` VALUES ('5', '牙科', '如果长期不为宠物清洁牙齿，口腔中的细菌、皮屑、食物残渣等，便会积累形成牙菌斑，进而产生牙垢，并逐步演变成坚硬的牙结石。牙结石堆积不仅会压迫牙龈，导致牙龈肿胀出血、牙齿松动、牙龈萎缩等一系列口腔问题;更有可能导致宠物罹患肾病心脏疾病等大病。\n');
INSERT INTO `keshimsg` VALUES ('6', '内分泌科', '内分泌科室专门助理内分泌疾病的专门科室，主要治疗糖尿病、肥胖症等疾病的临床诊治。\n');
INSERT INTO `keshimsg` VALUES ('7', '影像科', '影像科室是所有其他科室所依赖的中心科室。无论内外科，在诊断上都高频率的需要借助影像科专业人才的精准判读与建议。X光射线、B超、彩超、核磁、内视镜、DR、C型臂，搭配外科进行为病患做更准确与及时的治疗。\n');
INSERT INTO `keshimsg` VALUES ('8', '心脏科', '心脏血管系统是维持生命活动的重要器官，它主要参与机体的血液循环代谢，因此与其他系统关系非常为密切。心脏血管系统原发病虽不多，但当发病时必然要引起其他系统机能障碍，其他系统疾病，也常常影响心脏血管系统的机能。某些特定品种的宠物、超过8岁的老年宠物，罹患心脏血管系统的可能性都比较高。安安宠医心脏病专科配备心脏专用听诊器、血压仪、数字X线诊断系统、大型彩超诊断系统等高端设备，还拥有专业的心脏病专科医疗团队支持，给宠物提供精准的诊疗和贴心的服务。\n');
INSERT INTO `keshimsg` VALUES ('9', '肿瘤科', '犬猫肿瘤病为常见多发病，近年来呈上升趋势。是目前危害宠物健康的主要杀手之一。随着宠物年龄的增长，特别是犬龄、猫龄10年以上，50%终死于癌症。当您发现爱宠体表有包块时，要立即去医院就诊。因为任何肿瘤未转移是可以治疗，发生转移也可以延长生命，提高生活质量。\n');
INSERT INTO `keshimsg` VALUES ('10', '皮肤科', '宠物易感染皮肤病，包括细菌性皮肤病、真菌性皮肤病、螨虫等皮肤寄生虫感染、过敏性皮肤病、角化性和皮脂溢性皮肤病、自身免疫性皮肤病、内分泌性皮肤病，先天性和后天性脱毛、色素异常等复杂顽固性皮肤病，安安宠医专业医生检查一般犬猫的系统性皮肤病检查包括跳蚤梳、透明胶带、拔毛、刮片涂片、刮片涂片染色、伍德氏灯、细针抽吸、细菌或真菌培养、皮肤活组织检查、过敏检查以及血液学检查，从而精准地给毛孩子做出治疗方案，恢复健康。\n');

-- ----------------------------
-- Table structure for `manage_users`
-- ----------------------------
DROP TABLE IF EXISTS `manage_users`;
CREATE TABLE `manage_users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `password` varchar(25) DEFAULT NULL,
  `role` varchar(25) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Records of manage_users
-- ----------------------------
INSERT INTO `manage_users` VALUES ('1', 'admin', '123456', '超级管理员');
INSERT INTO `manage_users` VALUES ('15', 'admin2', '1234', '管理员');
INSERT INTO `manage_users` VALUES ('16', 'admin3', '123456', '管理员');

-- ----------------------------
-- Table structure for `qingjiamsg`
-- ----------------------------
DROP TABLE IF EXISTS `qingjiamsg`;
CREATE TABLE `qingjiamsg` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `time` date DEFAULT NULL,
  `howlong` varchar(255) DEFAULT NULL,
  `li_you` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Records of qingjiamsg
-- ----------------------------
INSERT INTO `qingjiamsg` VALUES ('1', '菲菲', '2022-03-19', '3天', '不想上班', '同意批准');
INSERT INTO `qingjiamsg` VALUES ('2', '猪猪', '2022-03-19', '1天', '感冒', '不批准');
INSERT INTO `qingjiamsg` VALUES ('3', '刘万健', '2022-03-28', '3天', '不想上班', '不批准');
INSERT INTO `qingjiamsg` VALUES ('5', '大大', '2022-03-27', '3天', '不想上班', '申请中');
INSERT INTO `qingjiamsg` VALUES ('16', '1212', '2022-04-21', '6', '6', '不批准');
INSERT INTO `qingjiamsg` VALUES ('19', 'lisi', '2022-05-21', '3天', '不想上班', '同意批准');

-- ----------------------------
-- Table structure for `usuall_fill`
-- ----------------------------
DROP TABLE IF EXISTS `usuall_fill`;
CREATE TABLE `usuall_fill` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title_ming` varchar(255) DEFAULT NULL,
  `reason` varchar(255) DEFAULT NULL,
  `sysbol` varchar(255) DEFAULT NULL,
  `fangfa` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Records of usuall_fill
-- ----------------------------
INSERT INTO `usuall_fill` VALUES ('2', '皮肤硬块', '病因∶这泛指一切在皮肤表面摸到凹凸不平的物体，有分良性和恶性，轻微的可以是因撞瘀而引起的。', '病征∶无故在皮下出现肿皮肤硬块，而又令宠物感到很不舒服，痕痒，便应尽快带往兽医处检查。\n', '预防︰若因撞伤告成血块，饲主当然要多加留意宠物的活动环境，其它良性或恶性的肿瘤却没有甚么方法可以避免。\n');
INSERT INTO `usuall_fill` VALUES ('3', '猫科泌尿系统综合征\n', '病因︰主要发生在猫只身上，可能与饮食有关，例如矿物质过高，辅助维他命太多等。另外亦有可能与环境有关，例如环境不佳，猫厕所不适合，造成猫儿忍尿，引致膀胱发炎，产生尿结石。', '病征︰猫儿有频尿，小便困难及有血尿。猫主若发现猫儿在砂盘逗留很耐，砂盘气味有所改变，或猫儿不吃东西、肚胀，可能显示猫儿有此综合征，应带往兽医处检查，因此病严重可引致猫儿在日半间呕吐及昏迷。\n', '预防︰最紧要是保持环境清洁，频换猫砂盘，令猫儿如厕放心。同时亦应提供足够的清水，特别是吃干粮的猫。\n');
INSERT INTO `usuall_fill` VALUES ('4', '眼病', '眼睑内翻，毛发刺激，结膜炎，角膜炎，泪腺炎', '沙皮的头部皱折多，容易眼睑内翻。白色的贵宾、比熊和博美等，容易泪管阻塞，而有两条明显的泪痕。', '可以将眼睛周围毛发修剪干净，严重的话要去医院手术。炎症感染的话要用杀菌和抗病毒的眼药水进行控制。');
INSERT INTO `usuall_fill` VALUES ('5', '呼吸道疾病', '鼻子后缩，连带气管也转个弯，容易喉头麻痹，气管萎缩，打呼噜。', '短鼻的北京、西施、巴哥、拳狮等', '喂食杀菌颗粒');
INSERT INTO `usuall_fill` VALUES ('6', '外耳炎', '外耳炎', '长耳垂过下巴的可卡，或是耳道内毛密集的贵宾、西施、北京、马尔济斯等等', '按时清晰耳朵');
INSERT INTO `usuall_fill` VALUES ('7', '感冒', '太冷', '流鼻涕，咳嗽，精神萎靡。严重的感冒，狗狗还会发烧、呼吸急促', '喂食感冒颗粒。');
INSERT INTO `usuall_fill` VALUES ('8', '呕吐', '食用过期食物，食用过冷或不易消化的食物，误食药物，感染犬瘟热、犬肝炎、感染寄生虫。', '呕吐东西出来', '如果主人有定期为自家狗狗定期驱虫、接种防疫针和定期体检就能预防很多问题。如果是饮食不当，可以让禁食一天，保证有干净饮食即可。');
INSERT INTO `usuall_fill` VALUES ('10', '腹泻', '急慢性和病毒性肠胃炎、食物中毒、受凉、消化不良', '排便过稀', '消化不良、受凉都可以给狗狗喂益生菌，增加肠道的菌群数量，促进肠胃功能恢复健康和稳定，建议使用宠物专用的益生菌“馋不腻益生菌”，采用五代益生菌，更能保持三百亿益生菌活性，使其更有效更有针对地让狗狗的肠胃得到恢复，能有效止泻。');
INSERT INTO `usuall_fill` VALUES ('13', '发烧', '感冒引起', '发热', '多喝热水，及时就医');

-- ----------------------------
-- Table structure for `yuyuemsg`
-- ----------------------------
DROP TABLE IF EXISTS `yuyuemsg`;
CREATE TABLE `yuyuemsg` (
  `id` int NOT NULL AUTO_INCREMENT,
  `petname` varchar(255) DEFAULT NULL,
  `petuser` varchar(255) DEFAULT NULL,
  `phone` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `keshi` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `doctor` varchar(255) DEFAULT NULL,
  `yuYueTime` datetime DEFAULT NULL,
  `daytime` varchar(255) DEFAULT NULL,
  `time_duan` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Records of yuyuemsg
-- ----------------------------
INSERT INTO `yuyuemsg` VALUES ('18', '小狗', '阿斯达', '123', '软组织外科', '李菲', '2022-03-29 00:00:00', '下午', '17:00-18:00');
INSERT INTO `yuyuemsg` VALUES ('21', '小马', 'admin', '123456789', '骨科', '简文涛', '2022-04-16 00:00:00', '上午', '8:00-9:00');
INSERT INTO `yuyuemsg` VALUES ('26', '二哈', 'admin', '18378555259', '软组织外科', '李菲', '2022-05-21 00:00:00', '下午', '17:00-18:00');
INSERT INTO `yuyuemsg` VALUES ('36', '二哈', 'admin', '18378555259', '软组织外科', '李菲', '2022-05-21 00:00:00', '下午', '17:00-18:00');
INSERT INTO `yuyuemsg` VALUES ('37', 'null', 'zsd', '18378555259', '骨科', '杜福尔', '2022-05-21 00:00:00', '上午', '8:00-9:00');

-- ----------------------------
-- Table structure for `zhibanmsg`
-- ----------------------------
DROP TABLE IF EXISTS `zhibanmsg`;
CREATE TABLE `zhibanmsg` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `mondayStatus` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `tuesdayStatus` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `wednesdayStatus` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `thursdayStatus` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `fridayStatus` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `saturdayStatus` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `sundayStatus` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `name` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Records of zhibanmsg
-- ----------------------------
INSERT INTO `zhibanmsg` VALUES ('1', '张维森', '上班', '上班', '休息', '夜班', '上班', '上班', '调休', null);
INSERT INTO `zhibanmsg` VALUES ('2', '杜福尔', '夜班', '休息', '上班', '上班', '休息', '夜班', '上班', null);
INSERT INTO `zhibanmsg` VALUES ('3', '李清玲', '上班', '休息', '休息', '休息', '休息', '休息', '休息', null);
INSERT INTO `zhibanmsg` VALUES ('4', '简文涛', '休息', '休息', '休息', '休息', '休息', '休息', '休息', null);
INSERT INTO `zhibanmsg` VALUES ('5', '宋静玲', '上班', '休息', '休息', '休息', '休息', '休息', '休息', null);
INSERT INTO `zhibanmsg` VALUES ('6', '钱大伟', '休息', '休息', '休息', '休息', '休息', '休息', '休息', null);
INSERT INTO `zhibanmsg` VALUES ('7', '张文泽', '休息', '休息', '休息', '休息', '休息', '休息', '休息', null);
INSERT INTO `zhibanmsg` VALUES ('8', '李芳', '上班', '休息', '休息', '休息', '休息', '休息', '休息', null);
INSERT INTO `zhibanmsg` VALUES ('9', '郑美', '上班', '休息', '休息', '休息', '休息', '休息', '休息', null);
INSERT INTO `zhibanmsg` VALUES ('10', '刘慧', '上班', '上班', '上班', '上班', '上班', '上班', '上班', null);
INSERT INTO `zhibanmsg` VALUES ('11', '啊啊啊', '上夜班', '上班', '上班', '上班', '上班', '上班', '上班', null);
INSERT INTO `zhibanmsg` VALUES ('22', 'zhang', '上班', '上班', '上班', '上班', '上班', '上班', '上班', null);
INSERT INTO `zhibanmsg` VALUES ('24', '王五', '上班', '上夜班', '上班', '休息', '上班', '上班', '上班', null);
INSERT INTO `zhibanmsg` VALUES ('27', '石兴隆', '上班', '休息', '休息', '休息', '休息', '休息', '休息', null);
INSERT INTO `zhibanmsg` VALUES ('28', '中国机长', '上班12441', '上班', '上班', '上班', '上班', '上班', '上班', null);
INSERT INTO `zhibanmsg` VALUES ('29', 'lisi', '夜班', '上班', '休息', '休息', '上班', '夜班', '休息', null);
INSERT INTO `zhibanmsg` VALUES ('50', '赵晓芳', null, null, null, null, null, null, null, null);
DROP TRIGGER IF EXISTS `doctor_trigger`;
DELIMITER ;;
CREATE TRIGGER `doctor_trigger` AFTER INSERT ON `doctorlistmsg` FOR EACH ROW begin
    insert into zhibanmsg(username) values(new.username);
end
;;
DELIMITER ;
DROP TRIGGER IF EXISTS `insertDoc`;
DELIMITER ;;
CREATE TRIGGER `insertDoc` AFTER INSERT ON `doctor_users` FOR EACH ROW begin
    insert into doctorlistmsg (username,sex,phone) values(new.username,new.sex,new.phone);
end
;;
DELIMITER ;
DROP TRIGGER IF EXISTS `zhiban_trigger`;
DELIMITER ;;
CREATE TRIGGER `zhiban_trigger` AFTER INSERT ON `zhibanmsg` FOR EACH ROW begin
    insert into dakamsg (name) values(new.username);
end
;;
DELIMITER ;
