import { StyleSheet } from "@react-pdf/renderer";

const BORDER_COLOR = '#bfbfbf'
const BORDER_STYLE = 'solid'

const COL_CONTAINER_WIDTH = 20
const COL_MEASURES_WIDTH = 58
const COL_DATE_WIDTH = 10
const COL_AMOUNT_WIDTH = 12

const ReportStyles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    textAlign: 'center',
    paddingTop: 35,
    paddingBottom: 52,
    paddingHorizontal: 35,
  },
  title: {
    position: 'absolute',
    textAlign: 'left',
    top: -25,
    left: -2,
    color: 'grey',
    width: '100%',
    textOverflow: 'ellipsis',
    maxLines: 1
  },
  section: {
    flexGrow: 0
  },
  table: {
    display: "table",
    width: "97%",
    borderStyle: BORDER_STYLE,
    borderColor: BORDER_COLOR,
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    margin: "auto"
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row"
  },
  tableColMeasuresHeader: {
    width: COL_MEASURES_WIDTH + '%',
    borderStyle: BORDER_STYLE,
    borderColor: BORDER_COLOR,
    borderBottomColor: '#000',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0
  },
  tableColContainerHeader: {
    width: COL_CONTAINER_WIDTH + "%",
    borderStyle: BORDER_STYLE,
    borderColor: BORDER_COLOR,
    borderBottomColor: '#000',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0
  },
  tableColDateHeader: {
    width: COL_DATE_WIDTH + "%",
    borderStyle: BORDER_STYLE,
    borderColor: BORDER_COLOR,
    borderBottomColor: '#000',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0
  },
  tableColAmountHeader: {
    width: COL_AMOUNT_WIDTH + "%",
    borderStyle: BORDER_STYLE,
    borderColor: BORDER_COLOR,
    borderBottomColor: '#000',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0
  },
  tableColMeasures: {
    width: COL_MEASURES_WIDTH + '%',
    borderStyle: BORDER_STYLE,
    borderColor: BORDER_COLOR,
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0
  },
  tableColContainer: {
    width: COL_CONTAINER_WIDTH + "%",
    borderStyle: BORDER_STYLE,
    borderColor: BORDER_COLOR,
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0
  },
  tableColDate: {
    width: COL_DATE_WIDTH + "%",
    borderStyle: BORDER_STYLE,
    borderColor: BORDER_COLOR,
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0
  },
  tableColAmount: {
    width: COL_AMOUNT_WIDTH + "%",
    borderStyle: BORDER_STYLE,
    borderColor: BORDER_COLOR,
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0
  },
  tableCellHeader: {
    margin: 5,
    fontSize: 12,
    fontWeight: 500
  },
  tableCell: {
    margin: 5,
    fontSize: 10
  },
  companyNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: -25,
    left: 0,
    right: 690,
    textAlign: 'left',
    color: 'grey',
    width: '30%',
  },
  vintage: {
    position: 'absolute',
    fontSize: 12,
    bottom: -25,
    left: '30%',
    textAlign: 'left',
    color: 'grey',
    width: '20%',
  },
  bottlingNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: -25,
    left: '50%',
    textAlign: 'left',
    color: 'grey',
    width: '40%',
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: -25,
    right: 0,
    textAlign: 'right',
    color: 'grey',
    width: '11%',
  }
});

export default ReportStyles;
