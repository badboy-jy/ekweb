// 车辆数据类型定义
export interface Vehicle {
  id: number;
  brand: string;
  model: string;
  type: string; // 牵引车、搅拌车等
  driveType: string; // 4×2、8×4等
  engineModel: string;
  torque: string;
  emissionStandard: string;
  controlType: string;
  originalPrice: number;
  currentPrice: number;
  image: string;
}

// 车型分类数据
export interface VehicleCategory {
  id: number;
  name: string;
  count: number;
  icon: string;
}

// 关键数据指标
export interface KeyData {
  id: number;
  label: string;
  value: string;
  icon: string;
}

// 业务能力数据
export interface BusinessCapability {
  id: number;
  title: string;
  description: string;
  icon: string;
}


// 车型分类数据
export const vehicleCategories: VehicleCategory[] = [
  { id: 1, name: "重商", count: 8, icon: "fa-truck-moving" },
  { id: 2, name: "轻卡", count: 0, icon: "fa-truck" },
  { id: 3, name: "皮卡", count: 2, icon: "fa-truck-pickup" },
  { id: 4, name: "VAN", count: 2, icon: "fa-shuttle-van" },
  { id: 5, name: "新能源", count: 0, icon: "fa-charging-station" },
  { id: 6, name: "其他", count: 15, icon: "fa-ellipsis" }
];

// 关键数据指标
export const keyData: KeyData[] = [
  { id: 1, label: "成立时间", value: "2020 年", icon: "fa-building" },
  { id: 2, label: "库存车辆", value: "500+", icon: "fa-car" },
  { id: 3, label: "累计出口", value: "5000+", icon: "fa-globe" },
  { id: 4, label: "出口国家", value: "20+", icon: "fa-flag" },
  { id: 5, label: "品质保证", value: "365 天", icon: "fa-shield-alt" }
];

// 业务能力数据
export const businessCapabilities: BusinessCapability[] = [
  { 
    id: 1, 
    title: "主营产品", 
    description: "专注 0 公里库存二手卡车，为全球客户提供高品质的商用车产品。", 
    icon: "fa-box-truck" 
  },
  { 
    id: 2, 
    title: "定制服务", 
    description: "支持定制化改装，根据客户需求提供个性化的商用车解决方案。", 
    icon: "fa-wrench" 
  },
  { 
    id: 3, 
    title: "物流保障", 
    description: "支持从中国港口发运至目的港，提供安全、高效的国际物流服务。", 
    icon: "fa-ship" 
  },
  { 
    id: 4, 
    title: "售后支持", 
    description: "提供配件服务及上门维修，保修期为 3 个月 - 1 年。", 
    icon: "fa-headset" 
  }
];

// 合作品牌
export const partnerBrands = [
  { id: 1, name: "福田汽车", logo: "https://space.coze.cn/api/coze_space/gen_image?image_size=square_hd&prompt=FOTOn%20logo%2C%20truck%20manufacturer%2C%20white%20background&sign=55a30bd43facfa296c62b72f051b647c" },
  { id: 2, name: "中国重汽", logo: "https://space.coze.cn/api/coze_space/gen_image?image_size=square_hd&prompt=SINOTRUK%20logo%2C%20truck%20manufacturer%2C%20white%20background&sign=1cc694ae9f34621b47f5a4ad143b2b13" },
  { id: 3, name: "东风汽车", logo: "https://space.coze.cn/api/coze_space/gen_image?image_size=square_hd&prompt=Dongfeng%20logo%2C%20truck%20manufacturer%2C%20white%20background&sign=247280ad435b86c0202bd4b80ee9ab31" },
  { id: 4, name: "陕汽国际", logo: "https://space.coze.cn/api/coze_space/gen_image?image_size=square_hd&prompt=Shaanxi%20Auto%20logo%2C%20truck%20manufacturer%2C%20white%20background&sign=4e4e68d4c5289f11b7c12fe58194da23" }
];