<template>
	<view-box
	ref="viewbox"
	id="page-city"
	class="page"
	body-padding-top="0"
	body-padding-bottom="0"
	:style="{}"
	>
		<div class="panel">
				
			<div class="top" id="top">
				<div class="city">
					{{ currentWeather.basic.city }}
					<span class="right">
						<x-icon type="refresh" class="reload" @click.native="update"></x-icon>
						<popover placement="bottom" class="switch" v-if="cityList.length>1">
							<div slot="content">
								<p v-for="city,i in cityList" :key="i" @click="switchCity(city)">{{city}}</p>
							</div>
							<x-icon type="arrow-swap"></x-icon>
						</popover>
						<popover placement="left" class="more">
							<div slot="content">
								<p @click="showAddCityPopup=true">添加城市</p>
								<p @click="removeCity">移除此城市</p>
								<p @click="showSetting=true">设置</p>
							</div>
							<x-icon type="more"></x-icon>
						</popover>
					</span>
				</div>
				<div class="brief">
					{{ currentWeather.now.tmp }}<span class="symbol">℃</span>
					<span class="situation">
						{{ currentWeather.now.cond.txt }}
						<!-- <img class="icon" :src="getIconBySituation(currentWeather.now.cond.txt)"></img> -->
						<x-icon type="ios-cloudy" size="30" v-if="currentWeather.now.cond.code==101"></x-icon>
						<x-icon type="ios-partlysunny" size="30" v-else-if="currentWeather.now.cond.code==103"></x-icon>
						<x-icon type="ios-rainy" size="30" v-else-if="currentWeather.now.cond.code==307"></x-icon>
						<!-- 日期 -->
						<span class="date">
							{{
							(currentWeather.basic.update && currentWeather.basic.update.loc.split(' ')[0]) || '--'
							}}
						</span>
						
					</span>
				</div>
				<div class="greet" v-if="theme[2]">
					<x-icon type="chatbubble" size="16"></x-icon> {{theme[2]}}
				</div>
			</div>

			<div class="body" id="body">
				<!-- 预警 -->
				<div class="alarm" v-if="currentWeather.alarms.length">
					{{currentWeather.alarms[0].level}}: 
					{{currentWeather.alarms[0].title}}
				</div>
				<!-- 未来三天 -->
				<div 
				class="future-three-days" 
				v-if="currentWeather.daily_forecast.length && setting.future3days"
				>
					<p class="title">未来三天</p>
					<flexbox :gutter="2">
						<flexbox-item class="item" :span="2">
							今天
						</flexbox-item>
						<flexbox-item class="item" :span="5">
							{{ currentWeather.daily_forecast[0].cond.txt_d + ' / ' + currentWeather.daily_forecast[0].cond.txt_n }}
						</flexbox-item>
						<flexbox-item class="item" :span="5">
							{{ currentWeather.daily_forecast[0].tmp.max + '℃' + ' / ' + currentWeather.daily_forecast[0].tmp.min + '℃' }}
						</flexbox-item>
					</flexbox>
					<flexbox :gutter="2">
						<flexbox-item class="item" :span="2">
							明天
						</flexbox-item>
						<flexbox-item class="item" :span="5">
							{{ currentWeather.daily_forecast[1].cond.txt_d + ' / ' + currentWeather.daily_forecast[1].cond.txt_n }}
						</flexbox-item>
						<flexbox-item class="item" :span="5">
							{{ currentWeather.daily_forecast[1].tmp.max + '℃' + ' / ' + currentWeather.daily_forecast[1].tmp.min + '℃' }}
						</flexbox-item>
					</flexbox>
					<flexbox :gutter="2">
						<flexbox-item class="item" :span="2">
							后天
						</flexbox-item>
						<flexbox-item class="item" :span="5">
							{{ currentWeather.daily_forecast[2].cond.txt_d + ' / ' + currentWeather.daily_forecast[2].cond.txt_n }}
						</flexbox-item>
						<flexbox-item class="item" :span="5">
							{{ currentWeather.daily_forecast[2].tmp.max + '℃' + ' / ' + currentWeather.daily_forecast[2].tmp.min + '℃' }}
						</flexbox-item>
					</flexbox>
				</div>
				<!-- 未来24小时 -->
				<div class="future-24-hours" v-if="currentWeather.hourly_forecast.length && setting.future24hours">
					<p class="title">未来24小时每3小时</p>
					<div class="wrapper">
						<div 
						class="item" 
						v-for="item,i in currentWeather.hourly_forecast" 
						:key="i"
						>
							<p class="time">{{item.date.split(' ')[1]}}</p>
							<p class="tmp">{{item.tmp}}℃</p>
							<p class="situation">{{item.cond.txt}}</p>
						</div>
					</div>
				</div>
				<!-- 详细数据 -->
				<div class="detail" v-if="setting.showDetail">
					<p 
					class="title" 
					@click="expandDetail=!expandDetail"
					:style="{borderWidth:expandDetail?'1px':'0'}"
					>详细数据</p>
					<div class="content" v-show="expandDetail">
						<flexbox :gutter="10">
							<flexbox-item class="item">
								<div class="name">阴晴</div>
								<div class="value">{{ currentWeather.now.cond.txt }}</div>
							</flexbox-item>
							<flexbox-item class="item">
								<div class="name">降水量</div>
								<div class="value">{{ currentWeather.now.pcpn }}</div>
							</flexbox-item>
							<flexbox-item class="item">
								<div class="name">相对湿度</div>
								<div class="value">{{ currentWeather.now.hum }}</div>
							</flexbox-item>
						</flexbox>
						<flexbox :gutter="10">
							<flexbox-item class="item">
								<div class="name">AQI</div>
								<div class="value">{{ currentWeather.aqi.city.aqi }}</div>
							</flexbox-item>
							<flexbox-item class="item">
								<div class="name">PM2.5</div>
								<div class="value">{{ currentWeather.aqi.city.pm25 }}</div>
							</flexbox-item>
							<flexbox-item class="item">
								<div class="name">空气质量</div>
								<div class="value">{{ currentWeather.aqi.city.qlty }}</div>
							</flexbox-item>
						</flexbox>
						<flexbox :gutter="10">
							<flexbox-item class="item">
								<div class="name">风向</div>
								<div class="value">{{ currentWeather.now.wind.dir }}</div>
							</flexbox-item>
							<flexbox-item class="item">
								<div class="name">风力</div>
								<div class="value">{{ currentWeather.now.wind.sc }}</div>
							</flexbox-item>
							<flexbox-item class="item">
								<div class="name">风速</div>
								<div class="value">{{ currentWeather.now.wind.spd }}</div>
							</flexbox-item>
						</flexbox>
						<flexbox :gutter="10">
							<flexbox-item class="item">
								<div class="name">体感温度</div>
								<div class="value">{{ currentWeather.now.fl }}</div>
							</flexbox-item>
							<flexbox-item class="item">
								<div class="name">气压</div>
								<div class="value">{{ currentWeather.now.pres }}</div>
							</flexbox-item>
							<flexbox-item class="item">
								<div class="name">能见度</div>
								<div class="value">{{ currentWeather.now.vis }}</div>
							</flexbox-item>
						</flexbox>
						<flexbox :gutter="10">
							<flexbox-item class="item">
								<div class="name">一氧化碳</div>
								<div class="value">{{ currentWeather.aqi.city.co }}</div>
							</flexbox-item>
							<flexbox-item class="item">
								<div class="name">二氧化氮</div>
								<div class="value">{{ currentWeather.aqi.city.no2 }}</div>
							</flexbox-item>
							<flexbox-item class="item">
								<div class="name">臭氧</div>
								<div class="value">{{ currentWeather.aqi.city.o3 }}</div>
							</flexbox-item>
						</flexbox>
					</div>
				</div>
				<!-- 建议 -->
				<div class="suggestions" v-if="setting.showSuggestions">
					<p 
					class="title" 
					@click="expandSuggestions=!expandSuggestions"
					:style="{borderWidth:expandSuggestions?'1px':'0'}"
					>建议</p>
					<div class="content" v-show="expandSuggestions">
						<flexbox :gutter="10">
							<flexbox-item class="item name" :span="3">
								穿衣 <x-icon type="tshirt" size="16"></x-icon>
							</flexbox-item>
							<flexbox-item class="item" :span="8">
								<!-- <p class="brief">{{ currentWeather.suggestion.drsg.brf }}</p> -->
								<p class="txt">{{ currentWeather.suggestion.drsg.txt }}</p>
							</flexbox-item>
						</flexbox>
						<flexbox :gutter="10">
							<flexbox-item class="item name" :span="3">
								运动 <x-icon type="ios-football" size="18"></x-icon>
							</flexbox-item>
							<flexbox-item class="item" :span="8">
								<!-- <p class="brief">{{ currentWeather.suggestion.sport.brf }}</p> -->
								<p class="txt">{{ currentWeather.suggestion.sport.txt }}</p>
							</flexbox-item>
						</flexbox>
						<flexbox :gutter="10">
							<flexbox-item class="item name" :span="3">
								紫外线<x-icon type="ios-sunny" size="21"></x-icon>
							</flexbox-item>
							<flexbox-item class="item" :span="8">
								<!-- <p class="brief">{{ currentWeather.suggestion.uv.brf }}</p> -->
								<p class="txt">{{ currentWeather.suggestion.uv.txt }}</p>
							</flexbox-item>
						</flexbox>
						<flexbox :gutter="10">
							<flexbox-item class="item name" :span="3">
								旅行 <x-icon type="plane" size="16"></x-icon>
							</flexbox-item>
							<flexbox-item class="item" :span="8">
								<!-- <p class="brief">{{ currentWeather.suggestion.trav.brf }}</p> -->
								<p class="txt">{{ currentWeather.suggestion.trav.txt }}</p>
							</flexbox-item>
						</flexbox>
						<flexbox :gutter="10">
							<flexbox-item class="item name" :span="3">
								流感 <x-icon type="ios-medkit" size="16"></x-icon>
							</flexbox-item>
							<flexbox-item class="item" :span="8">
								<!-- <p class="brief">{{ currentWeather.suggestion.flu.brf }}</p> -->
								<p class="txt">{{ currentWeather.suggestion.flu.txt }}</p>
							</flexbox-item>
						</flexbox>
						<flexbox :gutter="10">
							<flexbox-item class="item name" :span="3">
								洗车 <x-icon type="waterdrop" size="16"></x-icon>
							</flexbox-item>
							<flexbox-item class="item" :span="8">
								<!-- <p class="brief">{{ currentWeather.suggestion.cw.brf }}</p> -->
								<p class="txt">{{ currentWeather.suggestion.cw.txt }}</p>
							</flexbox-item>
						</flexbox>
					</div>
				</div>
			</div>
			<!-- 版权 -->
			<!-- <p class="copyright" v-show="showCopyRight">Designed by Hisheng</p> -->
		</div>
		<!-- 添加城市的弹出页 -->
		<popup
		v-model="showAddCityPopup"
		height="100%"
		width="100%"
		:show-mask="false"
		>
			<x-header
			title="添加城市"
			:leftOptions="{showBack: false}"
			>
			<span slot="left" @click="showAddCityPopup=false">取消</span>
			<span slot="right" @click="addCity">保存</span>
			</x-header>

			<group>
				<x-input title="" v-model="newCityName" placeholder="输入城市名称"></x-input>
			</group>

		</popup>
		<!-- 设置 -->
		<setting v-model="showSetting" @settingUpdate="onSettingUpdate" @showAbout="showAbout=true"></setting>
		<about v-model="showAbout"></about>
	</view-box>
</template>

<script>
	import {
		ViewBox, Flexbox, FlexboxItem, Popover, Popup, XHeader, XInput, Group, Grid, GridItem
	} from 'vux'
	import findIndex from 'lodash/findIndex'
	import cloneDeep from 'lodash/cloneDeep'
	import setting from '../component/popup-setting.vue'
	import about from '../component/popup-about.vue'
	export default {
		name: 'page-city',
		components: {
			ViewBox, Flexbox, FlexboxItem, Popover, Popup, XHeader, XInput, Group, setting, Grid, GridItem, about
		},
		props: {
			city: {
				type: String,
				default: ''
			}
		},
		computed: {
			cityList: function(){
				return this.$store.state.cityList
			},
			setting: function(){
				return this.$store.state.setting
			}
		},
		data (){
			return {
				expandDetail: false,
				expandSuggestions: false,
				showCopyRight: false,
				showAddCityPopup: false,
				showSetting: false,
				showAbout: false,
				newCityName: '',
				theme: [],
				currentWeather: {
					alarms: [],
					aqi: {
						city: {}
					},
					basic: {},
					daily_forecast: [],
					hourly_forecast: [],
					now: {
						cond: {}, // 当前天气状况
						wind: {} // 当前风况
					},
					suggestion: {
						air: {}, // 空气
						comf: {}, // 舒适度
						cw: {}, // 洗车
						drsg: {}, // 
						flu: {}, // 流感
						sport: {}, // 运动
						trav: {}, // 旅行
						uv: {}, // 紫外线
					},
				}
			}
		},
		/*mounted (){
			document.getElementById('body').onscroll = (e) => {
				// let top = document.getElementById('top')
				// top.style.backgroundColor = 'transparent'
				// let opacity = (45 - e.target.scrollTop) / 45
				// top.style.opacity = opacity === 1 ? opacity : 1 - opacity
				// if(opacity === 1)
				// 	top.style.backgroundColor = 'transparent'
				// else top.style.backgroundColor = '#108ee9'
				console.log('onscroll',e.target.scrollTop,e.target.scrollHeight)
				this.showCopyRight = e.target.scrollTop === 750
			}
		},*/
		created (){
			this.expandDetail = this.setting.expandDetail
			this.expandSuggestions = this.setting.expandSuggestions
		},
		activated (){
			this.update()
			// setInterval(() => {
			// 	this.update()
			// },5*60*1000)
		},
		methods: {
			onSettingUpdate (){
				console.log('got settingUpdate')
				this.expandDetail = this.setting.expandDetail
				this.expandSuggestions = this.setting.expandSuggestions
			},
			switchCity (city){
				if(city !== this.city){
					this.city = city
					this.update()
				}
			},
			// 移除城市
			removeCity (){
				this.$vux.confirm.show({
					title: '移除城市',
					content: '您确定要移除该城市？(如果是定位城市默认不可移除)',
					onConfirm: () => {
						this.$vux.loading.show('移除中')
						let cityList = cloneDeep(this.cityList)
						let index = cityList.indexOf(this.city)
						if(index !== -1){
							cityList.splice(index,1)
							this.$store.commit('setCityList',cityList)
						}
						this.city = ''
						setTimeout(() => {
							this.$vux.loading.hide()
							this.$vux.toast.text('已移除')
							this.update()
						},1500)
					}
				})
			},
			// 添加城市
			addCity (){
				if(!this.newCityName.trim())return;
				this.$vux.loading.show('添加中')
				this.api.weather.search(this.newCityName.trim()).then(res => {
					this.$vux.loading.hide()
					console.log('>>> [res] 添加城市',res)
					if(res.data.data.HeWeather5[0].status === 'ok'){
						let city = res.data.data.HeWeather5[0].basic.city
						this.addCityToStore(city)
						this.showAddCityPopup = false
						this.$vux.toast.text('已添加')
						this.city = city
						this.update()
					}else this.$vux.toast.text('未查询到该城市')
				}).catch(err => {
					this.$vux.loading.hide()
					console.log('>>> [err] 添加城市',err)
					this.$vux.toast.text('网络状况似乎有问题哦')
				})
			},
			addCityToStore (city){
				city = city.replace('市','')
				let cityList = cloneDeep(this.cityList)
				let index = cityList.indexOf(city)
				if(index === -1){
					cityList.unshift(city)
					this.$store.commit('setCityList',cityList)
				}
				console.log('addCityToStore',this.cityList)
			},
			setTheme (){
				let hour = new Date().getHours()
				if(hour >= 23 || (hour >=0 && hour <= 3))
					this.theme = this.$store.state.theme.day.midnight
				else if(hour >= 5 && hour <= 6)
					this.theme = this.$store.state.theme.day.dawn
				else if(hour >= 7 && hour <= 11)
					this.theme = this.$store.state.theme.day.morning
				else if(hour >= 12 && hour <= 13)
					this.theme = this.$store.state.theme.day.afternoon
				else if(hour >= 17 && hour <= 18)
					this.theme = this.$store.state.theme.day.dusk
				else if(hour >= 19 && hour <= 22)
					this.theme = this.$store.state.theme.day.evening
				else this.theme = ['#ffe9a7','#0e77ca','']
				// document.getElementById('page-city').style.background = 'red'
				document.getElementById('page-city').style.background = 
				`-webkit-linear-gradient(top,${this.theme[0]},${this.theme[1]})`
				document.getElementById('page-city').style.background = 
				`-ms-linear-gradient(top,${this.theme[0]},${this.theme[1]})`
				document.getElementById('page-city').style.background = 
				`-o-linear-gradient(top,${this.theme[0]},${this.theme[1]})`
				console.log('setTheme',this.theme,`linear-gradient(top,${this.theme[0]},${this.theme[1]})`)
			},
			update (){
				this.setTheme()
				this.$vux.loading.show()
				this.getCurrentWeather()
			},
			locate (){
				return new Promise((resolve,reject) => {
					this.$vux.loading.show({text:'定位中'})
					this.api.weather.locate().then(res => {
						this.$vux.loading.hide();
						console.log('>>> [res] locate',res)
						if(res.data.err.level < 3){
							this.city = res.data.data
							this.addCityToStore(this.city)
							resolve(res.data.data)
						}else reject('定位失败');
					}).catch(err => {
						this.$vux.loading.hide();
						reject('定位失败');
						console.log('>>> [err] locate',err)
					})
				})
			},
			// 获取当前天气
			getCurrentWeather (){
				let getData = (city) => {
					this.$vux.loading.show({text:'获取天气数据'})
					this.api.weather.getCurrentWeather(city).then(res => {
						this.$vux.loading.hide();
						console.log('>>> [res] getCurrentWeather',res)
						if(res.data.err.level < 3){
							let weather = res.data.data.HeWeather5[0]
							if(weather)
								this.currentWeather = Object.assign(this.currentWeather,weather)
						}else this.$vux.toast.text('天气数据获取失败');
					}).catch(err => {
						this.$vux.toast.text('天气数据获取失败');
						this.$vux.loading.hide();
						console.log('>>> [err] getCurrentWeather',err)
					});
				}
				if(this.city){
					console.log('no city')
					getData(this.city)
				}else {
					console.log('has city')
					this.locate().then(city => {
						getData(city)
					}).catch(err => {
						this.$vux.toast.text(err);
					})
				}
			},
			// 通过天气状况获取相对应的图标
			getIconBySituation (situation){
				let index = findIndex(this.situations,{chinese_name:situation})
				return index !== -1 ? 
				this.situations[index].icon : 
				this.situations[this.situations.length-1].icon
			},
		}
	}
</script>

<style lang="stylus">
	#page-city
		font-weight 400
		height 100%
		background-color #49a9ee
		background linear-gradient(top,#add8d5,#108ee9)
		.panel
			padding 0 20px 20px 20px
			color #ffffff
			opacity .7
			.top
				position absolute
				top 0
				left 0
				right 0
				padding 20px 20px 0 20px
				.city
					font-size 40px
					line-height 50px
					height 50px
					.situation
						.icon
							width 30px
							height 30px
					.right
						float right
						margin-top -5px
						svg
							fill #ffffff
							vertical-align middle
						.more, .switch
							font-size 16px
							display inline-block
							vertical-align middle
							.vux-popover
								padding 5px 20px
								line-height 2
								right 52px
								top 11px
								left auto
								opacity .85
								text-align center
								p
									white-space nowrap
						.more
							.vux-popover
								.vux-popover-arrow
									top 32px
						.switch
							.vux-popover
								right 16px
								top 68px
								div
									max-height 200px
									overflow-y auto
				.brief
					height 30px
					line-height 30px
					font-size 20px
					margin-top 5px	
					.symbol
						font-size 20px
						margin-left 2px
					svg
						fill #ffffff
						display inline-block
						vertical-align middle
						margin-top -5px
			.body
				position absolute
				top 135px
				left 0
				right 0
				padding 20px
				max-height calc(100% - 175px)
				overflow-y auto
				.future-three-days, .future-24-hours, .detail, .suggestions
					.title
						text-align center
						margin 0 auto
						margin-bottom 15px
						padding-bottom 5px
						width 90%
						border-bottom 1px solid #ffffff
				.future-three-days
					.item
						text-align center
						font-size 16px
						margin-bottom 10px
				.future-24-hours
					margin-top 20px
					text-align center
					.wrapper
						white-space nowrap
						overflow-x auto
						.item
							display inline-block
							width 80px
							margin 0 10px
							p
								line-height 1.5
								font-size 14px
							.time
								font-size 16px
				.detail
					margin-top 30px
					.vux-flexbox
						margin 20px 0
					.item
						text-align center
						.name
							font-size 14px
						.value
							font-size 20px
				.more-btn
					text-align center
					margin 0 auto
					width 80%
					height 30px
					margin-top 20px
					line-height 30px
				.suggestions
					margin-top 30px
					.vux-flexbox
						margin 20px 0
						font-size 16px
					.item.name
						text-align right
						svg
							display inline-block
							vertical-align middle
							margin-top -2px
					.item
						.txt
							font-size 14px
			svg
				fill #ffffff
				vertical-align middle
				margin-top -5px
			.copyright
				position absolute
				bottom 10px
				left 0
				right 0
				text-align center
				font-size 10px
				letter-spacing 1px
	.vux-header
		background-color #222222 !important
		.vux-header-left, .vux-header-right
			color #ffffff !important
</style>