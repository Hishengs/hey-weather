<template>
	<!-- 设置弹出页 -->
	<popup
	v-model="showSetting"
	height="100%"
	width="100%"
	:show-mask="false"
	id="popup-setting"
	>
		<x-header
		title="设置"
		:leftOptions="{showBack: false}"
		class="setting"
		>
		<span slot="left" @click="showSetting=false">取消</span>
		<span slot="right" @click="save">保存</span>
		</x-header>

		<group title="显示">
			<x-switch title="未来三天" v-model="tempSetting.future3days"></x-switch>
			<x-switch title="未来24小时" v-model="tempSetting.future24hours"></x-switch>
			<x-switch title="详细数据" v-model="tempSetting.showDetail"></x-switch>
			<x-switch title="建议" v-model="tempSetting.showSuggestions"></x-switch>
		</group>

		<group title="默认展开">
			<x-switch title="详细数据" v-model="tempSetting.expandDetail"></x-switch>
			<x-switch title="建议" v-model="tempSetting.expandSuggestions"></x-switch>
		</group>

		<group title="其他">
			<cell title="关于" :is-link="true" @click.native="$emit('showAbout')"></cell>
		</group>

	</popup>
</template>

<script>
	import {
		Popup, XHeader, Group, XSwitch, Cell
	} from 'vux'
	import cloneDeep from 'lodash/cloneDeep'
	export default {
		name: 'setting',
		components: {
			Popup, XHeader, Group, XSwitch, Cell
		},
		props: {
			value: {
				type: Boolean,
				default: false,
			}
		},
		watch: {
			value: function(val){
				this.showSetting = val
			},
			showSetting: function(val){
				this.$emit('input',val)
			},
		},
		data (){
			return {
				showSetting: false,
				tempSetting: {
					expandDetail: false,
					expandSuggestions: false,
					showDetail: false,
					showSuggestions: false,
					future3days: true,
					future24hours: true,
				}
			}
		},
		created (){
			this.tempSetting = cloneDeep(this.$store.state.setting)
		},
		methods: {
			// 保存设置
			save (){
				this.$store.commit('setSeting',this.tempSetting)
				this.showSetting = false
				this.$vux.toast.text('已保存')
				this.$emit('settingUpdate')
			},
		}
	}
</script>
