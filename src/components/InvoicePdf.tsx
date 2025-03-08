import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { format } from "date-fns";
import { FormDataInterface } from "../types";

const styles = StyleSheet.create({
  page: {
    padding: 50,
    backgroundColor: "#ffffff",
    fontFamily: "Helvetica",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 40,
    paddingBottom: 40,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  headerLeft: {
    flex: 1,
  },
  headerRight: {
    width: 200,
    textAlign: "right",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1e1e1e",
    marginBottom: 0,
  },
  subtitle: {
    fontSize: 14,
    color: "#6b7280",
  },
  status: {
    fontSize: 14,
    padding: "8 16",
    borderRadius: 8,
    backgroundColor: "#f3f4f6",
    color: "#1e1e1e",
    textTransform: "uppercase",
    fontWeight: "bold",
    alignSelf: "flex-start",
  },
  statusPaid: {
    backgroundColor: "#dcfce7",
    color: "#15803d",
  },
  statusPending: {
    backgroundColor: "#fff7ed",
    color: "#9a3412",
  },
  section: {
    marginBottom: 30,
  },
  grid: {
    flexDirection: "row",
    gap: 30,
  },
  column: {
    flex: 1,
  },
  label: {
    fontSize: 12,
    color: "#6b7280",
    marginBottom: 8,
    textTransform: "uppercase",
  },
  value: {
    fontSize: 14,
    color: "#1e1e1e",
    marginBottom: 4,
  },
  table: {
    marginTop: 30,
  },
  tableHeader: {
    backgroundColor: "#f9fafb",
    borderRadius: 8,
    marginBottom: 8,
    padding: "12 16",
  },
  tableHeaderText: {
    fontSize: 12,
    color: "#6b7280",
    fontWeight: "bold",
  },
  tableRow: {
    flexDirection: "row",
    padding: "12 16",
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },

  tableCell: {
    fontSize: 14,
    color: "#1e1e1e",
  },
  col1: { width: "40%" },
  col2: { width: "20%", textAlign: "center" },
  col3: { width: "20%", textAlign: "right" },
  col4: { width: "20%", textAlign: "right" },
  totalSection: {
    marginTop: 30,
    backgroundColor: "#1e1e1e",
    padding: 24,
    borderRadius: 8,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalLabel: {
    fontSize: 14,
    color: "#ffffff",
    opacity: 0.7,
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 50,
    right: 50,
    textAlign: "center",
    color: "#6b7280",
    fontSize: 10,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
  },
});

interface InvoiceDetailsProps {
  TheInvoice: FormDataInterface | null;
  // other props
}
const InvoicePdf = ({ TheInvoice }: InvoiceDetailsProps) => {
  const getStatusStyle = (status: string | undefined) => {
    switch (status) {
      case "paid":
        return styles.statusPaid;
      case "pending":
        return styles.statusPending;
      default:
        return {};
    }
  };
  return (
    <Document>
      <Page size={`A4`} style={styles.page}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.title}>INVOICE #{TheInvoice?.id} </Text>
            <Text style={styles.subtitle}>
              {" "}
              {TheInvoice?.projectDescription}{" "}
            </Text>
          </View>
          <View style={styles.headerRight}>
            <Text style={[styles.status, getStatusStyle(TheInvoice?.status)]}>
              {" "}
              {TheInvoice?.status}{" "}
            </Text>
          </View>
        </View>
        {/* bill details */}
        <View style={styles.section}>
          <View style={styles.grid}>
            <View style={styles.column}>
              <Text style={styles.label}> Bill From</Text>
              <Text style={styles.value}>
                {" "}
                {TheInvoice?.billFrom.streetAddress}{" "}
              </Text>
              <Text style={styles.value}> {TheInvoice?.billFrom.city} </Text>
              <Text style={styles.value}>
                {" "}
                {TheInvoice?.billFrom.postCode}{" "}
              </Text>
              <Text style={styles.value}> {TheInvoice?.billFrom.country} </Text>
            </View>

            <View style={styles.column}>
              <Text style={styles.label}> Bill To</Text>
              <Text style={styles.value}> {TheInvoice?.clientName} </Text>
              <Text style={styles.value}>
                {" "}
                {TheInvoice?.billTo.clientAddress}{" "}
              </Text>
              <Text style={styles.value}> {TheInvoice?.billTo.city} </Text>
              <Text style={styles.value}> {TheInvoice?.billTo.postCode} </Text>
              <Text style={styles.value}> {TheInvoice?.billTo.country} </Text>
            </View>

            <View style={styles.column}>
              <Text style={styles.label}> Ship To</Text>
              <Text style={styles.value}>
                {" "}
                {TheInvoice?.billTo.clientEmail}{" "}
              </Text>
            </View>
          </View>
        </View>
        {/* invoice details */}
        <View style={styles.section}>
          <View style={styles.grid}>
            <View style={styles.column}>
              <Text style={styles.label}> Invoice Date </Text>
              <Text style={styles.value}>
                {" "}
                {TheInvoice?.invoiceDate
                  ? format(new Date(TheInvoice.invoiceDate), "dd MMM yyyy")
                  : "N/A"}{" "}
              </Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.label}> Due Date </Text>
              <Text style={styles.value}>
                {" "}
                {TheInvoice?.invoiceDate
                  ? format(new Date(TheInvoice.dueDate), "dd MMM yyyy")
                  : "N/A"}{" "}
              </Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.label}> Payment Terms </Text>
              <Text style={styles.value}> {TheInvoice?.paymentTerms} </Text>
            </View>
          </View>
        </View>
        {/* items table */}
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderText, styles.col1]}>
              {" "}
              Item Name{" "}
            </Text>
            <Text style={[styles.tableHeaderText, styles.col2]}> QTY </Text>
            <Text style={[styles.tableHeaderText, styles.col3]}> Price </Text>
            <Text style={[styles.tableHeaderText, styles.col4]}> Total </Text>
          </View>
          {TheInvoice?.items.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={[styles.tableCell, styles.col1]}> {item.name} </Text>
              <Text style={[styles.tableCell, styles.col3]}>
                {" "}
                {item.quantity}{" "}
              </Text>
              <Text style={[styles.tableCell, styles.col3]}>
                $ {item.price.toFixed(2)}{" "}
              </Text>
              <Text style={[styles.tableCell, styles.col4]}>
                $ {item.total.toFixed(2)}{" "}
              </Text>
            </View>
          ))}
        </View>
        {/* total */}
        <View style={styles.totalSection}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>$ Amount Due </Text>
            <Text style={styles.totalLabel}>
              $ {TheInvoice?.amount.toFixed(2)}{" "}
            </Text>
          </View>
        </View>
        <Text style={styles.footer}>
            made By MedhatjAchour 
        </Text>
      </Page>
    </Document>
  );
};

export default InvoicePdf;
