<template>
  <div class="two-twoTestResult-container layout-padding">
    <el-card shadow="hover" class="layout-padding-auto">
      <div class="two-twoTestResult-search">
        <el-form :inline="true" ref="twoTestResultSearchRef" :model="state.tableData.param.query" size="default">
          <el-row>
            <el-form-item label="患者身份证号" class="ml20" size="default">
              <el-input v-model="state.tableData.param.query.patientId" placeholder="请输入患者身份证号" clearable
                      style="max-width: 180px"></el-input>
            </el-form-item>
            <el-form-item label="是否进行核磁共振检查 # 0=否 1=是" class="ml20" prop="mriPerformed">
              <el-select v-model="state.tableData.param.query.mriPerformed" placeholder="请选择是否进行核磁共振检查 # 0=否 1=是" clearable>
                <el-option
                  v-for="dict in two_history_mri_performed"
                    :key="Number(dict.value)"
                    :label="dict.label"
                    :value="Number(dict.value)"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="核磁共振检查日期" class="ml20" prop="mriDate">
              <el-date-picker clearable
                              v-model="state.tableData.param.query.mriDate"
                              type="date"
                              value-format="yyyy-MM-dd"
                              placeholder="选择核磁共振检查日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="前列腺长度(cm)" class="ml20" size="default">
              <el-input v-model="state.tableData.param.query.prostateLength" placeholder="请输入前列腺长度(cm)" clearable
                      style="max-width: 180px"></el-input>
            </el-form-item>
            <el-form-item label="前列腺宽度(cm)" class="ml20" size="default">
              <el-input v-model="state.tableData.param.query.prostateWidth" placeholder="请输入前列腺宽度(cm)" clearable
                      style="max-width: 180px"></el-input>
            </el-form-item>
            <el-form-item label="前列腺高度(cm)" class="ml20" size="default">
              <el-input v-model="state.tableData.param.query.prostateHeight" placeholder="请输入前列腺高度(cm)" clearable
                      style="max-width: 180px"></el-input>
            </el-form-item>
            <el-form-item label="前列腺体积(ml)" class="ml20" size="default">
              <el-input v-model="state.tableData.param.query.prostateVolume" placeholder="请输入前列腺体积(ml)" clearable
                      style="max-width: 180px"></el-input>
            </el-form-item>
            <el-form-item label="核磁共振结果是否异常 # 0=否 1=是" class="ml20" prop="mriAbnormality">
              <el-select v-model="state.tableData.param.query.mriAbnormality" placeholder="请选择核磁共振结果是否异常 # 0=否 1=是" clearable>
                <el-option
                  v-for="dict in two_history_mri_abnormality"
                    :key="Number(dict.value)"
                    :label="dict.label"
                    :value="Number(dict.value)"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="病灶位置 # 1=外周带 2=移行带 3=外周带+移行带" class="ml20" prop="tumorLocation">
              <el-select v-model="state.tableData.param.query.tumorLocation" placeholder="请选择病灶位置 # 1=外周带 2=移行带 3=外周带+移行带" clearable>
                <el-option
                  v-for="dict in two_history_tumor_location"
                    :key="Number(dict.value)"
                    :label="dict.label"
                    :value="Number(dict.value)"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="PI-RADS评分" class="ml20" size="default">
              <el-input v-model="state.tableData.param.query.piRadsScore" placeholder="请输入PI-RADS评分" clearable
                      style="max-width: 180px"></el-input>
            </el-form-item>
            <el-form-item label="是否进行穿刺 # 0=否 1=是" class="ml20" prop="biopsyPerformed">
              <el-select v-model="state.tableData.param.query.biopsyPerformed" placeholder="请选择是否进行穿刺 # 0=否 1=是" clearable>
                <el-option
                  v-for="dict in two_history_biopsy_performed"
                    :key="Number(dict.value)"
                    :label="dict.label"
                    :value="Number(dict.value)"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="穿刺日期" class="ml20" prop="biopsyDate">
              <el-date-picker clearable
                              v-model="state.tableData.param.query.biopsyDate"
                              type="date"
                              value-format="yyyy-MM-dd"
                              placeholder="选择穿刺日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="穿刺结果 # 0=阴性 1=腺泡腺癌  2=特殊病理类型恶性肿瘤 3=其他" class="ml20" prop="biopsyResult">
              <el-select v-model="state.tableData.param.query.biopsyResult" placeholder="请选择穿刺结果 # 0=阴性 1=腺泡腺癌  2=特殊病理类型恶性肿瘤 3=其他" clearable>
                <el-option
                  v-for="dict in two_history_biopsy_result"
                    :key="Number(dict.value)"
                    :label="dict.label"
                    :value="Number(dict.value)"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="其他穿刺结果" class="ml20" size="default">
              <el-input v-model="state.tableData.param.query.biopsyOtherResult" placeholder="请输入其他穿刺结果" clearable
                      style="max-width: 180px"></el-input>
            </el-form-item>
            <el-form-item label="Gleason主要评分" class="ml20" size="default">
              <el-input v-model="state.tableData.param.query.gleasonPrimary" placeholder="请输入Gleason主要评分" clearable
                      style="max-width: 180px"></el-input>
            </el-form-item>
            <el-form-item label="Gleason次要评分" class="ml20" size="default">
              <el-input v-model="state.tableData.param.query.gleasonSecondary" placeholder="请输入Gleason次要评分" clearable
                      style="max-width: 180px"></el-input>
            </el-form-item>
            <el-form-item label="Gleason总评分" class="ml20" size="default">
              <el-input v-model="state.tableData.param.query.gleasonTotal" placeholder="请输入Gleason总评分" clearable
                      style="max-width: 180px"></el-input>
            </el-form-item>
            <el-form-item label="临床分期T 分为：T1、T2、T3、T4" class="ml20" prop="clinicalStageT">
              <el-select v-model="state.tableData.param.query.clinicalStageT" placeholder="请选择临床分期T 分为：T1、T2、T3、T4" clearable>
                <el-option
                  v-for="dict in two_history_clinical_stage_t"
                    :key="Number(dict.value)"
                    :label="dict.label"
                    :value="Number(dict.value)"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="临床分期N 分为：N0、N1" class="ml20" prop="clinicalStageN">
              <el-select v-model="state.tableData.param.query.clinicalStageN" placeholder="请选择临床分期N 分为：N0、N1" clearable>
                <el-option
                  v-for="dict in two_history_clinical_stage_n"
                    :key="Number(dict.value)"
                    :label="dict.label"
                    :value="Number(dict.value)"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="临床分期M 分为：M0、M1" class="ml20" prop="clinicalStageM">
              <el-select v-model="state.tableData.param.query.clinicalStageM" placeholder="请选择临床分期M 分为：M0、M1" clearable>
                <el-option
                  v-for="dict in two_history_clinical_stage_m"
                    :key="Number(dict.value)"
                    :label="dict.label"
                    :value="Number(dict.value)"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="前列腺癌分类 分为T1-2N0M0是局限性前列腺癌、T3-4N0M0或者任意T分期N1M0是局部进展性前列腺癌、任意T分期任意N分期M1是转移性前列腺癌" class="ml20" prop="cancerClassification">
              <el-select v-model="state.tableData.param.query.cancerClassification" placeholder="请选择前列腺癌分类 分为T1-2N0M0是局限性前列腺癌、T3-4N0M0或者任意T分期N1M0是局部进展性前列腺癌、任意T分期任意N分期M1是转移性前列腺癌" clearable>
                <el-option
                  v-for="dict in two_history_cancer_classification"
                    :key="Number(dict.value)"
                    :label="dict.label"
                    :value="Number(dict.value)"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="ISUP分级 # 1=1级 2=2级 3=3级 4=4级 5=5级" class="ml20" prop="isupGrade">
              <el-select v-model="state.tableData.param.query.isupGrade" placeholder="请选择ISUP分级 # 1=1级 2=2级 3=3级 4=4级 5=5级" clearable>
                <el-option
                  v-for="dict in two_history_isup_grade"
                    :key="Number(dict.value)"
                    :label="dict.label"
                    :value="Number(dict.value)"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="后续治疗方案 # 1=根治性手术 2=放疗 3=不可逆电穿孔 4=单纯药物治疗 5=观察 6=其他" class="ml20" prop="treatmentPlan">
              <el-select v-model="state.tableData.param.query.treatmentPlan" placeholder="请选择后续治疗方案 # 1=根治性手术 2=放疗 3=不可逆电穿孔 4=单纯药物治疗 5=观察 6=其他" clearable>
                <el-option
                  v-for="dict in two_history_treatment_plan"
                    :key="Number(dict.value)"
                    :label="dict.label"
                    :value="Number(dict.value)"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="其他后续治疗方案" class="ml20" size="default">
              <el-input v-model="state.tableData.param.query.treatmentOtherPlan" placeholder="请输入其他后续治疗方案" clearable
                      style="max-width: 180px"></el-input>
            </el-form-item>
            <el-form-item label="BPH药物治疗 # 0=未使用药物治疗	 1=5a还原酶抑制剂  2=a受体阻滞剂  3=中成药治疗  4=植物制剂  5=其他" class="ml20" prop="bphMedication">
              <el-select v-model="state.tableData.param.query.bphMedication" placeholder="请选择BPH药物治疗 # 0=未使用药物治疗	 1=5a还原酶抑制剂  2=a受体阻滞剂  3=中成药治疗  4=植物制剂  5=其他" clearable>
                <el-option
                  v-for="dict in two_history_bph_medication"
                    :key="Number(dict.value)"
                    :label="dict.label"
                    :value="Number(dict.value)"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="其他BPH药物治疗" class="ml20" size="default">
              <el-input v-model="state.tableData.param.query.bphOtherMedication" placeholder="请输入其他BPH药物治疗" clearable
                      style="max-width: 180px"></el-input>
            </el-form-item>
            <el-form-item label="BPH是否手术治疗 # 0=否  1=是" class="ml20" size="default">
              <el-input v-model="state.tableData.param.query.bphSurgeryPerformed" placeholder="请输入BPH是否手术治疗 # 0=否  1=是" clearable
                      style="max-width: 180px"></el-input>
            </el-form-item>
            <el-form-item label="BPH手术时间" class="ml20" prop="bphSurgeryDate">
              <el-date-picker clearable
                              v-model="state.tableData.param.query.bphSurgeryDate"
                              type="date"
                              value-format="yyyy-MM-dd"
                              placeholder="选择BPH手术时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="BPH手术治疗方式 # 1=激光剜除手术 2=TURP 3=Uro-lift 4=热消融术5=水刀机器人 6=其它微创治疗" class="ml20" prop="bphSurgeryType">
              <el-select v-model="state.tableData.param.query.bphSurgeryType" placeholder="请选择BPH手术治疗方式 # 1=激光剜除手术 2=TURP 3=Uro-lift 4=热消融术5=水刀机器人 6=其它微创治疗" clearable>
                <el-option
                  v-for="dict in two_history_bph_surgery_performed"
                    :key="Number(dict.value)"
                    :label="dict.label"
                    :value="Number(dict.value)"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="BPH手术治疗其他方式" class="ml20" prop="bphSurgeryOtherType">
              <el-select v-model="state.tableData.param.query.bphSurgeryOtherType" placeholder="请选择BPH手术治疗其他方式" clearable>
                <el-option
                  v-for="dict in two_history_bph_surgery_type"
                    :key="dict.value"
                    :label="dict.label"
                    :value="dict.value"
                />
              </el-select>
            </el-form-item>
            <el-button size="default" type="primary" class="ml20" @click="getTableData">
              <el-icon><ele-Search /></el-icon> 查询
            </el-button>
            <el-button size="default" class="ml20" @click="resetQuery">
              <el-icon><ele-Refresh /></el-icon> 重置
            </el-button>
          </el-row>
        </el-form>
      </div>
      <el-row :gutter="35">
          <el-button size="default" type="success" plain class="ml30" @click="onOpenAdd('add')">
            <el-icon><ele-FolderAdd /></el-icon> 新增
          </el-button>
      </el-row>
      <el-table :data="state.tableData.records" v-loading="state.tableData.loading" style="width: 100%">
        <el-table-column type="index" label="序号" width="60" />
        <el-table-column label="编号" prop="id" show-overflow-tooltip/>
        <el-table-column label="患者身份证号" prop="patientId" show-overflow-tooltip/>
        <el-table-column label="是否进行核磁共振检查 # 0=否 1=是" prop="mriPerformed" show-overflow-tooltip>
          <template #default="scope">
            <el-tag :type="two_history_mri_performed[scope.row.mriPerformed].elTagType">{{ two_history_mri_performed[scope.row.mriPerformed].label }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="核磁共振检查日期" prop="mriDate" show-overflow-tooltip>
          <template #default="scope">
            <span>{{ parseDateTime(scope.row.mriDate) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="前列腺长度(cm)" prop="prostateLength" show-overflow-tooltip/>
        <el-table-column label="前列腺宽度(cm)" prop="prostateWidth" show-overflow-tooltip/>
        <el-table-column label="前列腺高度(cm)" prop="prostateHeight" show-overflow-tooltip/>
        <el-table-column label="前列腺体积(ml)" prop="prostateVolume" show-overflow-tooltip/>
        <el-table-column label="核磁共振结果是否异常 # 0=否 1=是" prop="mriAbnormality" show-overflow-tooltip>
          <template #default="scope">
            <el-tag :type="two_history_mri_abnormality[scope.row.mriAbnormality].elTagType">{{ two_history_mri_abnormality[scope.row.mriAbnormality].label }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="病灶位置 # 1=外周带 2=移行带 3=外周带+移行带" prop="tumorLocation" show-overflow-tooltip>
          <template #default="scope">
            <el-tag :type="two_history_tumor_location[scope.row.tumorLocation].elTagType">{{ two_history_tumor_location[scope.row.tumorLocation].label }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="PI-RADS评分" prop="piRadsScore" show-overflow-tooltip/>
        <el-table-column label="是否进行穿刺 # 0=否 1=是" prop="biopsyPerformed" show-overflow-tooltip>
          <template #default="scope">
            <el-tag :type="two_history_biopsy_performed[scope.row.biopsyPerformed].elTagType">{{ two_history_biopsy_performed[scope.row.biopsyPerformed].label }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="穿刺日期" prop="biopsyDate" show-overflow-tooltip>
          <template #default="scope">
            <span>{{ parseDateTime(scope.row.biopsyDate) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="穿刺结果 # 0=阴性 1=腺泡腺癌  2=特殊病理类型恶性肿瘤 3=其他" prop="biopsyResult" show-overflow-tooltip>
          <template #default="scope">
            <el-tag :type="two_history_biopsy_result[scope.row.biopsyResult].elTagType">{{ two_history_biopsy_result[scope.row.biopsyResult].label }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="其他穿刺结果" prop="biopsyOtherResult" show-overflow-tooltip/>
        <el-table-column label="Gleason主要评分" prop="gleasonPrimary" show-overflow-tooltip/>
        <el-table-column label="Gleason次要评分" prop="gleasonSecondary" show-overflow-tooltip/>
        <el-table-column label="Gleason总评分" prop="gleasonTotal" show-overflow-tooltip/>
        <el-table-column label="临床分期T 分为：T1、T2、T3、T4" prop="clinicalStageT" show-overflow-tooltip>
          <template #default="scope">
            <el-tag :type="two_history_clinical_stage_t[scope.row.clinicalStageT].elTagType">{{ two_history_clinical_stage_t[scope.row.clinicalStageT].label }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="临床分期N 分为：N0、N1" prop="clinicalStageN" show-overflow-tooltip>
          <template #default="scope">
            <el-tag :type="two_history_clinical_stage_n[scope.row.clinicalStageN].elTagType">{{ two_history_clinical_stage_n[scope.row.clinicalStageN].label }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="临床分期M 分为：M0、M1" prop="clinicalStageM" show-overflow-tooltip>
          <template #default="scope">
            <el-tag :type="two_history_clinical_stage_m[scope.row.clinicalStageM].elTagType">{{ two_history_clinical_stage_m[scope.row.clinicalStageM].label }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="前列腺癌分类 分为T1-2N0M0是局限性前列腺癌、T3-4N0M0或者任意T分期N1M0是局部进展性前列腺癌、任意T分期任意N分期M1是转移性前列腺癌" prop="cancerClassification" show-overflow-tooltip>
          <template #default="scope">
            <el-tag :type="two_history_cancer_classification[scope.row.cancerClassification].elTagType">{{ two_history_cancer_classification[scope.row.cancerClassification].label }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="ISUP分级 # 1=1级 2=2级 3=3级 4=4级 5=5级" prop="isupGrade" show-overflow-tooltip>
          <template #default="scope">
            <el-tag :type="two_history_isup_grade[scope.row.isupGrade].elTagType">{{ two_history_isup_grade[scope.row.isupGrade].label }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="后续治疗方案 # 1=根治性手术 2=放疗 3=不可逆电穿孔 4=单纯药物治疗 5=观察 6=其他" prop="treatmentPlan" show-overflow-tooltip>
          <template #default="scope">
            <el-tag :type="two_history_treatment_plan[scope.row.treatmentPlan].elTagType">{{ two_history_treatment_plan[scope.row.treatmentPlan].label }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="其他后续治疗方案" prop="treatmentOtherPlan" show-overflow-tooltip/>
        <el-table-column label="BPH药物治疗 # 0=未使用药物治疗	 1=5a还原酶抑制剂  2=a受体阻滞剂  3=中成药治疗  4=植物制剂  5=其他" prop="bphMedication" show-overflow-tooltip>
          <template #default="scope">
            <el-tag :type="two_history_bph_medication[scope.row.bphMedication].elTagType">{{ two_history_bph_medication[scope.row.bphMedication].label }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="其他BPH药物治疗" prop="bphOtherMedication" show-overflow-tooltip/>
        <el-table-column label="BPH是否手术治疗 # 0=否  1=是" prop="bphSurgeryPerformed" show-overflow-tooltip/>
        <el-table-column label="BPH手术时间" prop="bphSurgeryDate" show-overflow-tooltip>
          <template #default="scope">
            <span>{{ parseDateTime(scope.row.bphSurgeryDate) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="BPH手术治疗方式 # 1=激光剜除手术 2=TURP 3=Uro-lift 4=热消融术5=水刀机器人 6=其它微创治疗" prop="bphSurgeryType" show-overflow-tooltip>
          <template #default="scope">
            <el-tag :type="two_history_bph_surgery_performed[scope.row.bphSurgeryType].elTagType">{{ two_history_bph_surgery_performed[scope.row.bphSurgeryType].label }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="BPH手术治疗其他方式" prop="bphSurgeryOtherType" show-overflow-tooltip>
          <template #default="scope">
            <el-tag :type="two_history_bph_surgery_type[scope.row.bphSurgeryOtherType].elTagType">{{ two_history_bph_surgery_type[scope.row.bphSurgeryOtherType].label }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template #default="scope">
            <el-button size="small" text type="primary" @click="onOpenEdit('edit', scope.row)">修改</el-button>
            <el-button size="small" text type="primary" @click="onRowDel(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
          @size-change="onHandleSizeChange"
          @current-change="onHandleCurrentChange"
          class="mt15"
          :pager-count="5"
          :page-sizes="[10, 20, 30]"
          v-model:current-page="state.tableData.param.page.current"
          background
          v-model:page-size="state.tableData.param.page.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="state.tableData.total"
      >
      </el-pagination>
    </el-card>
    <TwoTestResultDialog ref="twoTestResultDialogRef" @refresh="getTableData()" />
  </div>
</template>

<script setup lang="ts" name="twoTestResult">
  import { defineAsyncComponent, reactive, onMounted, ref, nextTick, getCurrentInstance } from 'vue';
  import { ElMessageBox, ElMessage } from 'element-plus';
  import { useTwoTestResultApi } from '/@/api/two/testResult';
  import { parseDateTime } from '/@/utils/formatTime';
  
  // 获取字典
  const { proxy } = getCurrentInstance();
  const { two_history_mri_performed,two_history_mri_abnormality,two_history_clinical_stage_t,two_history_cancer_classification,two_history_bph_surgery_performed,two_history_isup_grade,two_history_treatment_plan,two_history_biopsy_result,two_history_biopsy_performed,two_history_tumor_location,two_history_bph_medication,two_history_clinical_stage_m,two_history_clinical_stage_n,two_history_bph_surgery_type } = proxy.parseDict("two_history_mri_performed","two_history_mri_abnormality","two_history_clinical_stage_t","two_history_cancer_classification","two_history_bph_surgery_performed","two_history_isup_grade","two_history_treatment_plan","two_history_biopsy_result","two_history_biopsy_performed","two_history_tumor_location","two_history_bph_medication","two_history_clinical_stage_m","two_history_clinical_stage_n","two_history_bph_surgery_type");
  
  // 引入组件
  const TwoTestResultDialog = defineAsyncComponent(() => import('./dialog.vue'));

  // 定义变量内容
  const twoTestResultDialogRef = ref();
  const twoTestResultSearchRef = ref();
  const useTwoTestResult = useTwoTestResultApi();
  const state = reactive({
    tableData: {
      records: [],
      total: 0,
      loading: false,
      param: {
        page: {
          current: 1,
          size: 10,
        },
        query: {
          patientId: '',
          mriPerformed: '',
          mriDate: '',
          prostateLength: '',
          prostateWidth: '',
          prostateHeight: '',
          prostateVolume: '',
          mriAbnormality: '',
          tumorLocation: '',
          piRadsScore: '',
          biopsyPerformed: '',
          biopsyDate: '',
          biopsyResult: '',
          biopsyOtherResult: '',
          gleasonPrimary: '',
          gleasonSecondary: '',
          gleasonTotal: '',
          clinicalStageT: '',
          clinicalStageN: '',
          clinicalStageM: '',
          cancerClassification: '',
          isupGrade: '',
          treatmentPlan: '',
          treatmentOtherPlan: '',
          bphMedication: '',
          bphOtherMedication: '',
          bphSurgeryPerformed: '',
          bphSurgeryDate: '',
          bphSurgeryType: '',
          bphSurgeryOtherType: '',
        },
      },
    },
  });

  // 初始化表格数据
  const getTableData = () => {
    state.tableData.loading = true;
    useTwoTestResult.getPageList(state.tableData.param).then(res => {
      state.tableData.records = res.records;
      state.tableData.total = res.total;
    });
    setTimeout(() => {
      state.tableData.loading = false;
    }, 500);
  };
  // 打开新增山西省智能数据辅助诊疗工程研究中心检测结果弹窗
  const onOpenAdd = (type: string) => {
    twoTestResultDialogRef.value.openDialog(type);
  };
  // 打开修改山西省智能数据辅助诊疗工程研究中心检测结果弹窗
  const onOpenEdit = (type: string, row) => {
    twoTestResultDialogRef.value.openDialog(type, row);
  };
  // 删除山西省智能数据辅助诊疗工程研究中心检测结果
  const onRowDel = (row) => {
    ElMessageBox.confirm('此操作将永久删除数据，是否继续?', '提示', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    })
        .then(() => {
          useTwoTestResult.deleteTwoTestResult(row.id).then(() => {
            getTableData();
            ElMessage.success('删除成功');
          });
        })
        .catch(() => {
          ElMessage.error('删除失败');
        });
  };
  // 重置搜索框
  const resetQuery = () => {
    nextTick(() => {
        twoTestResultSearchRef.value.resetFields();
    });
  }
  // 分页改变
  const onHandleSizeChange = (val: number) => {
    state.tableData.param.page.size = val;
    getTableData();
  };
  // 分页改变
  const onHandleCurrentChange = (val: number) => {
    state.tableData.param.page.current = val;
    getTableData();
  };
  // 页面加载时
  onMounted(() => {
    getTableData();
  });
</script>

<style scoped lang="scss">
  .two-twoTestResult-container {
    :deep(.el-card__body) {
      display: flex;
      flex-direction: column;
      flex: 1;
      overflow: auto;
      .el-table {
        flex: 1;
      }
    }
  }
</style>
