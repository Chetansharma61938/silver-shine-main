import React from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Link } from 'react-router-dom';
import {
  FileText, Receipt, AlertTriangle, Box, CheckCircle2, Hammer,
  Scissors, Wrench, Shield, PaintBucket, HardDrive as Screwdriver,
  CheckSquare, PackageCheck, CheckCircle, PenTool as Tool
} from 'lucide-react';
import { OrderStatus } from '../types';

// Simplified order type for Kanban view
interface KanbanOrder {
  id: string;
  chassisno: string;
  modelname: string;
  status: OrderStatus;
  delivery_date: string;
}

const statusIcons: Record<OrderStatus, React.ReactNode> = {
  'QUOTE_SENT': <FileText className="w-5 h-5 text-gray-500" />,
  'ORDER_RECEIVED': <Receipt className="w-5 h-5 text-blue-500" />,
  'PAYMENT_PENDING': <AlertTriangle className="w-5 h-5 text-yellow-500" />,
  'ORDER_PARTS': <Box className="w-5 h-5 text-purple-500" />,
  'ORDER_PARTS_DONE': <CheckCircle2 className="w-5 h-5 text-purple-500" />,
  'PRODUCTION_START': <Hammer className="w-5 h-5 text-orange-500" />,
  'CUTTER_START': <Scissors className="w-5 h-5 text-orange-500" />,
  'CUTTER_FINISH': <CheckCircle2 className="w-5 h-5 text-orange-500" />,
  'WELDING_START': <Wrench className="w-5 h-5 text-orange-500" />,
  'WELDING_FINISH': <CheckCircle2 className="w-5 h-5 text-orange-500" />,
  'PRODUCTION_QC': <Shield className="w-5 h-5 text-orange-500" />,
  'PAINTING': <PaintBucket className="w-5 h-5 text-indigo-500" />,
  'FITMENT': <Screwdriver className="w-5 h-5 text-indigo-500" />,
  'FINAL_QC': <CheckSquare className="w-5 h-5 text-indigo-500" />,
  'READY_FOR_DELIVERY': <PackageCheck className="w-5 h-5 text-green-500" />,
  'DELIVERED': <CheckCircle className="w-5 h-5 text-green-500" />,
  'MAINTENANCE': <Tool className="w-5 h-5 text-red-500" />
};

const statusGroups = [
  {
    title: 'Quote & Order',
    statuses: ['QUOTE_SENT', 'ORDER_RECEIVED', 'PAYMENT_PENDING'] as OrderStatus[],
    icon: <FileText className="w-5 h-5 text-gray-600" />
  },
  {
    title: 'Parts',
    statuses: ['ORDER_PARTS', 'ORDER_PARTS_DONE'] as OrderStatus[],
    icon: <Box className="w-5 h-5 text-purple-600" />
  },
  {
    title: 'Production',
    statuses: [
      'PRODUCTION_START',
      'CUTTER_START',
      'CUTTER_FINISH',
      'WELDING_START',
      'WELDING_FINISH',
      'PRODUCTION_QC'
    ] as OrderStatus[],
    icon: <Hammer className="w-5 h-5 text-orange-600" />
  },
  {
    title: 'Finishing',
    statuses: ['PAINTING', 'FITMENT', 'FINAL_QC'] as OrderStatus[],
    icon: <PaintBucket className="w-5 h-5 text-indigo-600" />
  },
  {
    title: 'Delivery',
    statuses: ['READY_FOR_DELIVERY', 'DELIVERED', 'MAINTENANCE'] as OrderStatus[],
    icon: <PackageCheck className="w-5 h-5 text-green-600" />
  }
];

interface KanbanColumnProps {
  title: string;
  orders: KanbanOrder[];
  status: OrderStatus;
}

function KanbanColumn({ title, orders, status }: KanbanColumnProps) {
  return (
    <div className="flex flex-col min-w-[300px] bg-gray-50 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-4">
        {statusIcons[status]}
        <h3 className="font-semibold text-gray-700">{title}</h3>
        <span className="ml-auto bg-gray-200 text-gray-700 rounded-full px-2 py-1 text-sm">
          {orders.length}
        </span>
      </div>
      <Droppable droppableId={status}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="flex-1 space-y-2"
          >
            {orders.map((order, index) => (
              <Draggable key={order.id} draggableId={order.id} index={index}>
                {(provided) => (
                  <Link
                    to={`/orders/${order.id}`}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="block bg-white p-4 rounded-md shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-2">
                      {statusIcons[order.status]}
                      <div>
                        <div className="font-medium text-gray-900">{order.chassisno}</div>
                        <div className="text-sm text-gray-500">{order.modelname}</div>
                      </div>
                    </div>
                    <div className="mt-2 text-xs text-gray-400">
                      Due: {new Date(order.delivery_date).toLocaleDateString()}
                    </div>
                  </Link>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

interface KanbanBoardProps {
  orders: KanbanOrder[];
  onOrderMove: (orderId: string, newStatus: OrderStatus) => Promise<void>;
}

export function KanbanBoard({ orders, onOrderMove }: KanbanBoardProps) {
  const handleDragEnd = async (result: any) => {
    if (!result.destination) return;

    const orderId = result.draggableId;
    const newStatus = result.destination.droppableId as OrderStatus;

    await onOrderMove(orderId, newStatus);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex gap-6 pb-6">
        {statusGroups.map((group, index) => (
          <React.Fragment key={group.title}>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                {group.icon}
                <h2 className="font-semibold text-lg text-gray-900">{group.title}</h2>
              </div>
              {group.statuses.map((status) => (
                <KanbanColumn
                  key={status}
                  title={status.replace(/_/g, ' ')}
                  orders={orders.filter((order) => order.status === status)}
                  status={status}
                />
              ))}
            </div>
            {index < statusGroups.length - 1 && (
              <div className="border-r border-gray-200 mx-2" />
            )}
          </React.Fragment>
        ))}
      </div>
    </DragDropContext>
  );
}