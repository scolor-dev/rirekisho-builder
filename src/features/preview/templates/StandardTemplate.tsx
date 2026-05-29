import { Document, Page, Text, View, Image, StyleSheet, Font } from '@react-pdf/renderer'
import type { ResumeData } from '../../builder/schema'

Font.register({
  family: 'NotoSansJP',
  src: '/rirekisho-builder/fonts/NotoSansCJKjp-Regular.otf',
})

const s = StyleSheet.create({
  page: {
    fontFamily: 'NotoSansJP',
    fontSize: 9,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 25,
    paddingRight: 25,
    color: '#000',
  },
  title: { fontSize: 18, textAlign: 'center', marginBottom: 4, letterSpacing: 8 },
  dateRow: { fontSize: 8, textAlign: 'right', marginBottom: 8 },
  table: {
    borderTop: '0.5 solid #000',
    borderLeft: '0.5 solid #000',
    borderRight: '0.5 solid #000',
    borderBottom: '0.5 solid #000',
    marginBottom: 6,
  },
  row: { flexDirection: 'row', borderBottom: '0.5 solid #000', minHeight: 18 },
  cell: { borderRight: '0.5 solid #000', padding: '2 3', justifyContent: 'center' },
  labelCell: { backgroundColor: '#f5f5f5', fontSize: 7, color: '#444' },
  valueCell: { fontSize: 9 },
  w15: { width: '15%' },
  w35: { width: '35%' },
  w85: { width: '85%' },
  nameText: { fontSize: 16 },
  sectionLabel: {
    fontSize: 8,
    marginTop: 8,
    marginBottom: 2,
    color: '#333',
    borderLeft: '2 solid #3B6D11',
    paddingLeft: 4,
  },
  historyRow: {
    flexDirection: 'row',
    borderBottom: '0.5 solid #000',
    minHeight: 18,
  },
  qualRow: {
    flexDirection: 'row',
    borderBottom: '0.5 solid #000',
    minHeight: 16,
  },
  yearCell: {
    width: '12%',
    borderRight: '0.5 solid #000',
    padding: '2 4',
    textAlign: 'center',
    justifyContent: 'center',
  },
  monthCell: {
    width: '8%',
    borderRight: '0.5 solid #000',
    padding: '2 4',
    textAlign: 'center',
    justifyContent: 'center',
  },
  historyContentCell: {
    width: '80%',
    padding: '2 4',
    justifyContent: 'center',
  },
  typeTag: {
    fontSize: 7,
    color: '#3B6D11',
    marginRight: 4,
  },
  photoBox: {
    width: 72,
    marginLeft: 6,
  },
  photoImg: {
    width: 72,
    height: 96,
    objectFit: 'cover',
  },
  photoEmpty: {
    width: 72,
    height: 96,
    border: '0.5 solid #aaa',
    backgroundColor: '#fafafa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoLabel: {
    fontSize: 6,
    color: '#aaa',
    textAlign: 'center',
    marginTop: 2,
  },
})

type Props = {
  data: Partial<ResumeData>
}

const now = new Date()
const dateStr = `${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日現在`

export default function StandardTemplate({ data }: Props) {
  const fullName = `${data.lastName ?? ''}　${data.firstName ?? ''}`
  const fullNameKana = `${data.lastNameKana ?? ''}　${data.firstNameKana ?? ''}`
  const genderLabel = data.gender === 'male' ? '男' : data.gender === 'female' ? '女' : 'その他'
  const histories = data.histories ?? []
  const qualifications = data.qualifications ?? []
  const hasPhoto = !!data.photo

  const historyRows = [
    ...histories,
    ...Array(Math.max(0, 16 - histories.length)).fill(null),
  ]

  const qualRowsP1 = [
    ...qualifications,
    ...Array(Math.max(0, 5 - qualifications.length)).fill(null),
  ]

  return (
    <Document>
      {/* 1ページ目 */}
      <Page size="A4" style={s.page}>
        <Text style={s.title}>履　歴　書</Text>
        <Text style={s.dateRow}>{dateStr}</Text>

        {/* 基本情報＋写真エリア */}
        <View style={{ flexDirection: 'row', marginBottom: 6 }}>
          <View style={{ flex: 1 }}>
            <View style={s.table}>
              <View style={s.row}>
                <View style={[s.cell, s.labelCell, s.w15]}><Text>ふりがな</Text></View>
                <View style={[s.cell, s.valueCell, s.w85]}><Text>{fullNameKana}</Text></View>
              </View>
              <View style={s.row}>
                <View style={[s.cell, s.labelCell, s.w15]}><Text>氏名</Text></View>
                <View style={[s.cell, s.valueCell, s.w85]}>
                  <Text style={s.nameText}>{fullName}</Text>
                </View>
              </View>
              <View style={s.row}>
                <View style={[s.cell, s.labelCell, s.w15]}><Text>生年月日</Text></View>
                <View style={[s.cell, s.valueCell, s.w35]}><Text>{data.birthDate ?? ''}</Text></View>
                <View style={[s.cell, s.labelCell, s.w15]}><Text>性別</Text></View>
                <View style={[s.cell, s.valueCell, s.w35]}><Text>{genderLabel}</Text></View>
              </View>
              <View style={s.row}>
                <View style={[s.cell, s.labelCell, s.w15]}><Text>郵便番号</Text></View>
                <View style={[s.cell, s.valueCell, s.w85]}><Text>{data.zipCode ?? ''}</Text></View>
              </View>
              <View style={[s.row, { borderBottom: 'none' }]}>
                <View style={[s.cell, s.labelCell, s.w15]}><Text>住所</Text></View>
                <View style={[s.cell, s.valueCell, s.w85]}><Text>{data.address ?? ''}</Text></View>
              </View>
            </View>

            <View style={s.table}>
              <View style={[s.row, { borderBottom: 'none' }]}>
                <View style={[s.cell, s.labelCell, s.w15]}><Text>電話番号</Text></View>
                <View style={[s.cell, s.valueCell, s.w35]}><Text>{data.phone ?? ''}</Text></View>
                <View style={[s.cell, s.labelCell, s.w15]}><Text>メール</Text></View>
                <View style={[s.cell, s.valueCell, s.w35]}><Text>{data.email ?? ''}</Text></View>
              </View>
            </View>
          </View>

          {/* 写真欄（写真あり: 実画像 / 写真なし: 枠のみ） */}
          <View style={s.photoBox}>
            {hasPhoto ? (
              <Image src={data.photo!} style={s.photoImg} />
            ) : (
              <View style={s.photoEmpty}>
                <Text style={{ fontSize: 7, color: '#bbb' }}>写真</Text>
              </View>
            )}
            <Text style={s.photoLabel}>写真貼付欄</Text>
          </View>
        </View>

        {/* 学歴・職歴 */}
        <Text style={s.sectionLabel}>学歴・職歴</Text>
        <View style={s.table}>
          <View style={s.historyRow}>
            <View style={[s.yearCell, s.labelCell]}><Text>年</Text></View>
            <View style={[s.monthCell, s.labelCell]}><Text>月</Text></View>
            <View style={[s.historyContentCell, s.labelCell]}><Text>事項</Text></View>
          </View>
          {historyRows.map((h, i) => (
            <View key={i} style={s.historyRow}>
              <View style={s.yearCell}><Text>{h?.year ?? ''}</Text></View>
              <View style={s.monthCell}><Text>{h?.month ?? ''}</Text></View>
              <View style={s.historyContentCell}>
                {h ? (
                  <Text>
                    <Text style={s.typeTag}>{h.type === 'education' ? '【学歴】' : '【職歴】'}</Text>
                    {h.content}
                  </Text>
                ) : <Text> </Text>}
              </View>
            </View>
          ))}
        </View>

        {/* 資格・免許 */}
        <Text style={s.sectionLabel}>資格・免許</Text>
        <View style={s.table}>
          <View style={s.qualRow}>
            <View style={[s.yearCell, s.labelCell]}><Text>年</Text></View>
            <View style={[s.monthCell, s.labelCell]}><Text>月</Text></View>
            <View style={[s.historyContentCell, s.labelCell]}><Text>資格・免許名</Text></View>
          </View>
          {qualRowsP1.map((q, i) => (
            <View key={i} style={s.qualRow}>
              <View style={s.yearCell}><Text>{q?.year ?? ''}</Text></View>
              <View style={s.monthCell}><Text>{q?.month ?? ''}</Text></View>
              <View style={s.historyContentCell}><Text>{q?.name ?? ''}</Text></View>
            </View>
          ))}
        </View>
      </Page>

      {/* 2ページ目：志望動機・自己PR・本人希望 */}
      <Page size="A4" style={s.page}>
        <Text style={s.sectionLabel}>志望動機</Text>
        <View style={s.table}>
          <View style={[s.row, { minHeight: 120 }]}>
            <View style={[s.cell, s.valueCell, { width: '100%' }]}>
              <Text>{data.motivation ?? ''}</Text>
            </View>
          </View>
        </View>

        <Text style={s.sectionLabel}>自己PR</Text>
        <View style={s.table}>
          <View style={[s.row, { minHeight: 120 }]}>
            <View style={[s.cell, s.valueCell, { width: '100%' }]}>
              <Text>{data.selfPR ?? ''}</Text>
            </View>
          </View>
        </View>

        <Text style={s.sectionLabel}>本人希望記入欄</Text>
        <View style={s.table}>
          <View style={[s.row, { minHeight: 80 }]}>
            <View style={[s.cell, s.valueCell, { width: '100%' }]}>
              <Text>{data.preference ?? ''}</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  )
}
