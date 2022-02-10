//引入自己配置的axios
import http from './axios'

//获取菜单列表
export const getMenuListTreeApi = () => {
    //istree=1 加了这个就是树形结构
    return http("/menulist?istree=1")
}
//获取角色列表
export const getrolelistApi = () => {
    return http("/rolelist")
}
//获取商品分类列表
export const getCatelistApi = () => {
    return http("/catelist?istree=1")
}
//获取会员列表
export const getMemberNumApi = () => {
    return http("/membercount")
}
//获取会员列表
export const getMemberListApi = () => {
    return http("/memberlist?page=1&size=99")
}
//删除菜单
export const delMenuApi = (id) => {
    return http.post('/menudelete', { id: id })
}
//删除角色
export const delUserApi = (id) => {
    return http.post('/userdelete', { id: id })
}
//删除管理员
export const delRoleApi = (id) => {
    return http.post('/roledelete', { id: id })
}
//删除商品分类
export const delCateApi = (id) => {
    return http.post('/catedelete', { id: id })
}
//删除商品规格分类
export const delSpecsApi = (id) => {
    return http.post('/specsdelete', { id: id })
}
//删除商品管理
export const delGoodsApi = (id) => {
    return http.post('/goodsdelete', { id: id })
}
//删除商品管理
export const delBannerApi = (id) => {
    return http.post('/bannerdelete', { id: id })
}
//删除秒杀
export const delSeckApi = (id) => {
    return http.post('/seckdelete', { id: id })
}
//修改菜单
export const editMenuApi = (data) => {
    return http.post('/menuedit', data)
}
//修改商品分类
export const editCateApi = (data) => {
    return http.post('/cateedit', data)
}
//修改角色
export const editRoleApi = (data) => {
    return http.post('/roleedit', data)
}
//修改角色
export const editSpecsApi = (data) => {
    return http.post('/specsedit', data)
}
//修改角色
// export const editMemberApi = (data) => {
//     return http.post('/memberedit', data)
// }
//修改商品管理
export const editGoodsApi = (data) => {
    return http.post('/goodsedit', data)
}
//修改商品管理
export const editBannersApi = (data) => {
    return http.post('/banneredit', data)
}
//修改秒杀
export const editSeckApi = (data) => {
    return http.post('/seckedit', data)
}
//修改会员
export const editMemberApi = (data) => {
    return http.post('/memberedit', data)
}
//添加角色
export const addRoleApi = (data) => {
    return http.post('/roleadd', data)
}
//添加商品分类
export const addCateApi = (data) => {
    return http.post('/cateadd', data)
}
//添加管理员
export const addAdminApi = (data) => {
    return http.post('/useradd', data)
}
//添加商品规格
export const addSpecsApi = (data) => {
    return http.post('/specsadd', data)
}
//添加商品管理
export const addGoodsApi = (data) => {
    return http.post('/goodsadd', data)
}
//添加轮播图
export const addBannerApi = (data) => {
    return http.post('/banneradd', data)
}
//添加秒杀
export const addSeckApi = (data) => {
    return http.post('/seckadd', data)
}
//获取管理员总数
export const getUserNumApi = () => {
    return http("/usercount")
}
//获取商品管理总数
export const getGoodsNumApi = () => {
    return http("/goodscount")
}
//获取商品规格总数
export const getSpecsNumApi = () => {
    return http("/specscount")
}
//获取管理员列表
export const getUserListApi = (data) => {
    return http("/userlist", { params: data })
}
//获取商品管理列表
export const getGoodsListApi = (data) => {
    return http("/goodslist", { params: data })
}
//获取商品规格列表
export const getSpecsListApi = () => {
    return http("/specslist?page=1&size=99")
}
//获取商品规格列表
export const getSeckListApi = () => {
    return http("/secklist")
}
//获取商品规格列表
export const getBannerListApi = () => {
    return http("/bannerlist")
}
//根据id获取列表
export const getListByIdApi = (pid) => {
    return http("/catelist", { params:{pid} })
}
//根据id获取属性值
export const getSpecsInfoByIdApi = (id) => {
    return http("/specsinfo", { params:{id:id} })
}
//根据id获取属性值
export const getGoodsInfoByIdApi = (second_cateid) => {
    return http("/goodsinfo", { params:{second_cateid} })
}
//管理员登录
export const userlogin = (data) => {
    return http.post("/userlogin", data)
}
