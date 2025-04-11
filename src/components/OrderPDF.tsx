import React from 'react';
import { 
  Document, 
  Page, 
  Text, 
  View, 
  StyleSheet, 
  Image 
} from '@react-pdf/renderer';
import { Order } from '../types';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 10,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingBottom: 10,
  },
  logo: {
    width: 100,
    marginRight: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 10,
  },
  sectionTitle: {
    backgroundColor: '#ffeb3b',
    padding: 5,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingVertical: 3,
  },
  cell: {
    flex: 1,
  },
  label: {
    fontWeight: 'bold',
    width: 120,
  },
  value: {
    flex: 1,
  },
  checkbox: {
    width: 12,
    height: 12,
    border: '1px solid black',
    marginRight: 5,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2,
  },
  comments: {
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#000',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: 'center',
    color: 'red',
    fontSize: 8,
  },
});

interface OrderPDFProps {
  order: Order;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
}

export function OrderPDF({ order, customer }: OrderPDFProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Image
            src="https://eablzgdjbiussgtrcwkp.supabase.co/storage/v1/object/public/assets/logo.png"
            style={styles.logo}
          />
          <View>
            <Text style={styles.title}>SILVER SHINE CHASSIS ORDER FORM</Text>
            <Text>Order Date: {order.order_date}</Text>
            <Text>Delivery Date: {order.delivery_date}</Text>
          </View>
        </View>

        {/* Basic Information */}
        <View style={styles.section}>
          <View style={styles.row}>
            <Text style={styles.label}>Customer:</Text>
            <Text style={styles.value}>{customer.name}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>SS Chassis No:</Text>
            <Text style={styles.value}>{order.chassis_no}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Model Name:</Text>
            <Text style={styles.value}>{order.model_name}</Text>
          </View>
        </View>

        {/* Chassis Dimensions */}
        <View style={styles.section}>
          <View style={styles.sectionTitle}>
            <Text>Chassis Dimensions</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Front:</Text>
            <Text style={styles.value}>{order.chassis_width_front}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Wheel Arch:</Text>
            <Text style={styles.value}>{order.chassis_width_wheel_arch}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Rear:</Text>
            <Text style={styles.value}>{order.chassis_width_rear}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Total Length:</Text>
            <Text style={styles.value}>{order.chassis_total_length}</Text>
          </View>
        </View>

        {/* Frame Options */}
        <View style={styles.section}>
          <View style={styles.sectionTitle}>
            <Text>Frame Options</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Chassis Type:</Text>
            <Text style={styles.value}>{order.chassis_type}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Frame Type:</Text>
            <Text style={styles.value}>{order.frame_type}</Text>
          </View>
        </View>

        {/* Suspension */}
        <View style={styles.section}>
          <View style={styles.sectionTitle}>
            <Text>Suspension</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Type:</Text>
            <Text style={styles.value}>{order.suspension_type}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Capacity:</Text>
            <Text style={styles.value}>{order.suspension_capacity}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Airbags:</Text>
            <Text style={styles.value}>{order.airbags || 'None'}</Text>
          </View>
        </View>

        {/* Water Tanks */}
        <View style={styles.section}>
          <View style={styles.sectionTitle}>
            <Text>Water Tanks</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Front:</Text>
            <Text style={styles.value}>
              {order.water_tanks.front.qty}x {order.water_tanks.front.size}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Between:</Text>
            <Text style={styles.value}>
              {order.water_tanks.between.qty}x {order.water_tanks.between.size}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Rear:</Text>
            <Text style={styles.value}>
              {order.water_tanks.rear.qty}x {order.water_tanks.rear.size}
            </Text>
          </View>
        </View>

        {/* Extras */}
        <View style={styles.section}>
          <View style={styles.sectionTitle}>
            <Text>Extras</Text>
          </View>
          {Object.entries(order.extras).map(([key, value]) => (
            <View key={key} style={styles.checkboxRow}>
              <View style={styles.checkbox} />
              <Text>{key.replace(/([A-Z])/g, ' $1').trim()}: {value.toString()}</Text>
            </View>
          ))}
        </View>

        {/* Comments */}
        <View style={styles.comments}>
          <Text>Comments:</Text>
          <Text>{order.comments}</Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text>Note: All the chassis are manufactured according to specifications provided by customer in this form.</Text>
          <Text>Silvershine chassis will not be responsible for any deviation after order get processed</Text>
        </View>
      </Page>
    </Document>
  );
}