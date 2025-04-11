import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Plus, History, LayoutGrid, List } from "lucide-react";
import { supabase } from "../lib/supabase";
import { Order, OrderStatus } from "../types";
import { KanbanBoard } from "../components/KanbanBoard";
import { OrderStatusHistory } from "../components/OrderStatusHistory";
import { OrderStatusSelect } from "../components/OrderStatusSelect";
import { PDFButton } from "../components/PDFButton";
import toast from "react-hot-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import { formatDate } from "@/utils/date";
import fetchAllChassisData from "@/utils/fetchAllChassisData";

export function Orders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState<"kanban" | "list">("kanban");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [orderinfo, setOrderInfo] = useState<any>();

  const handleOrderMove = async (orderId: string, newStatus: OrderStatus) => {
    try {
      const { error } = await supabase
        .from("orders")
        .update({ status: newStatus })
        .eq("id", orderId);

      if (error) throw error;

      setOrders(
        orders.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );

      toast.success("Order status updated");
      // fetchOrders();
    } catch (error) {
      toast.error("Error updating order status");
      console.error("Error:", error);
      // fetchOrders();
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const item = await fetchAllChassisData(); // Replace "customerId" with the actual customerId

      // Check if 'item' and 'order_informations' exist, and then check if it's not empty
      if (item?.order_informations?.length > 0) {
        setOrderInfo(item.order_informations); // Set the state with the length
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-6rem)] flex flex-col">
      {/* Fixed Header */}
      <div className="flex justify-between items-center mb-4 px-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Orders</h1>
          <div className="mt-2 flex items-center gap-2">
            <button
              onClick={() => setView("kanban")}
              className={`p-2 rounded-md transition-colors ${
                view === "kanban"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              title="Kanban view"
            >
              <LayoutGrid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setView("list")}
              className={`p-2 rounded-md transition-colors ${
                view === "list"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              title="List view"
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>
        <Link
          to="/orders/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-blue-700"
        >
          <Plus className="w-5 h-5" />
          New Order
        </Link>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-auto px-4">
        {view === "kanban" ? (
          <div className="h-full">
            <KanbanBoard orders={orders} onOrderMove={handleOrderMove} />
          </div>
        ) : (
          <div className="flex-1 overflow-auto px-4">
            <TableContainer
              component={Paper}
              className="bg-white shadow-sm rounded-lg"
            >
              <Table aria-label="order table">
                <TableHead className="bg-gray-50">
                  <TableRow>
                    <TableCell
                      align="left"
                      sx={{ fontSize: 12, fontWeight: "bold", color: "gray" }}
                    >
                      customer
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{ fontSize: 12, fontWeight: "bold", color: "gray" }}
                    >
                      Order By
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{ fontSize: 12, fontWeight: "bold", color: "gray" }}
                    >
                      Chassis No
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{ fontSize: 12, fontWeight: "bold", color: "gray" }}
                    >
                      Model
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{ fontSize: 12, fontWeight: "bold", color: "gray" }}
                    >
                      Order Date
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{ fontSize: 12, fontWeight: "bold", color: "gray" }}
                    >
                      Delivery Date
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orderinfo?.map((order: any, index: number) => (
                    <TableRow key={index}>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell>{order.orderby}</TableCell>

                      <TableCell>{order.chassisno}</TableCell>
                      <TableCell>{order.modelname}</TableCell>
                      <TableCell> {formatDate(order.created_at)}</TableCell>
                      <TableCell> {formatDate(order.deliverydate)} </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )}
      </div>

      {selectedOrder && (
        <OrderStatusHistory
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
}
