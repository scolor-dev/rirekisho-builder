import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from '@react-pdf/renderer'
import type { ResumeData } from '../../builder/schema'

Font.register({
  family: 'NotoSansJP',
  src: '/rirekisho-builder/fonts/NotoSansCJKjp-Regular.otf',
})

const s = StyleSheet.create({
  page: {
    fontFamily: 'NotoSansJP',
    fontSize: 8,
    padding: '15mm 10mm',
    color: '#000',
  },
  title: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 4,
  },
  dateRow: {
    textAlign: 'right',
    fontSize: 8,
    marginBottom: 6,
  },
  table: {
    borderTop: '1px solid #000',
    borderLeft: '1px solid #000',
  },
  row: {
    flexDirection: 'row',
    borderBottom: '1px solid #000',
  },
  cell: {
    borderRight: '1px solid #000',
    padding: '2mm 2mm',
  },
  label: {
    backgroundColor: '#f0f0f0',
    fontSize: 7,
    color: '#333',
  },
  value: {
    fontSize: 9,
  },
  w20: { width: '20%' },
  w30: { width: '30%' },
  w40: { width: '40%' },
  w50: { width: '50%' },
  w80: { width: '80%' },
  w100: { width: '100%' },
})

type Props = {
  data: Partial<ResumeData>
}

export default function ResumePDF({ data }: Props) {
  const fullName = `${data.lastName ?? ''}　${data.firstName ?? ''}`
  const fullNameKana = `${data.lastNameKana ?? ''}　${data.firstNameKana ?? ''}`

  return (
    <Document>
      <Page size="A4" style={s.page}>
        <Text style={s.title}>履　歴　書</Text>
        <Text style={s.dateRow}>
          {new Date().getFullYear()}年{new Date().getMonth() + 1}月{new Date().getDate()}日現在
        </Text>

        <View style={s.table}>
          {/* ふりがな・氏名 */}
          <View style={s.row}>
            <View style={[s.cell, s.label, s.w20]}>
              <Text>ふりがな</Text>
            </View>
            <View style={[s.cell, s.value, s.w80]}>
              <Text>{fullNameKana}</Text>
            </View>
          </View>
          <View style={s.row}>
            <View style={[s.cell, s.label, s.w20]}>
              <Text>氏名</Text>
            </View>
            <View style={[s.cell, s.value, s.w80]}>
              <Text style={{ fontSize: 14 }}>{fullName}</Text>
            </View>
          </View>

          {/* 生年月日・性別 */}
          <View style={s.row}>
            <View style={[s.cell, s.label, s.w20]}>
              <Text>生年月日</Text>
            </View>
            <View style={[s.cell, s.value, s.w30]}>
              <Text>{data.birthDate ?? ''}</Text>
            </View>
            <View style={[s.cell, s.label, s.w20]}>
              <Text>性別</Text>
            </View>
            <View style={[s.cell, s.value, s.w30]}>
              <Text>
                {data.gender === 'male' ? '男' : data.gender === 'female' ? '女' : 'その他'}
              </Text>
            </View>
          </View>

          {/* 郵便番号・住所 */}
          <View style={s.row}>
            <View style={[s.cell, s.label, s.w20]}>
              <Text>郵便番号</Text>
            </View>
            <View style={[s.cell, s.value, s.w80]}>
              <Text>{data.zipCode ?? ''}</Text>
            </View>
          </View>
          <View style={s.row}>
            <View style={[s.cell, s.label, s.w20]}>
              <Text>住所</Text>
            </View>
            <View style={[s.cell, s.value, s.w80]}>
              <Text>{data.address ?? ''}</Text>
            </View>
          </View>

          {/* 電話・メール */}
          <View style={s.row}>
            <View style={[s.cell, s.label, s.w20]}>
              <Text>電話番号</Text>
            </View>
            <View style={[s.cell, s.value, s.w30]}>
              <Text>{data.phone ?? ''}</Text>
            </View>
            <View style={[s.cell, s.label, s.w20]}>
              <Text>メール</Text>
            </View>
            <View style={[s.cell, s.value, s.w30]}>
              <Text>{data.email ?? ''}</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  )
}