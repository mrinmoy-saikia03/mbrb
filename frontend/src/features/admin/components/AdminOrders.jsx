import { useState, useEffect } from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Typography,
} from "@material-tailwind/react";
import { Package2, Truck, CheckCircle2, XCircle } from "lucide-react";
import { OrderCard } from "./OrderCard";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersAsync,
  resetOrderUpdateStatus,
  selectOrderUpdateStatus,
  selectOrders,
  updateOrderByIdAsync,
} from "../../order/OrderSlice";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
const TABS = [
  {
    label: "Pending",
    value: "Pending",
    icon: Package2,
  },
  {
    label: "Dispatched",
    value: "Dispatched",
    icon: Truck,
  },
  {
    label: "Delivered",
    value: "Delivered",
    icon: CheckCircle2,
  },
  {
    label: "Cancelled",
    value: "Cancelled",
    icon: XCircle,
  },
];

export const AdminOrders = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);

  useEffect(() => {
    dispatch(getAllOrdersAsync());
  }, [dispatch]);
  const [activeTab, setActiveTab] = useState("Pending");
  const filteredOrders = orders.filter((order) => order.status === activeTab);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <Typography variant="h3" className="mb-8">
          Order Management
        </Typography>

        <Tabs value={activeTab} className="mb-8">
          <TabsHeader>
            {TABS.map(({ label, value, icon: Icon }) => (
              <Tab
                key={value}
                value={value}
                onClick={() => setActiveTab(value)}
              >
                <div className="flex items-center gap-2 py-2">
                  <Icon className="h-4 w-4" />
                  <p>{label}</p>
                </div>
              </Tab>
            ))}
          </TabsHeader>
          <TabsBody>
            {TABS.map(({ value }) => (
              <TabPanel key={value} value={value}>
                <div className="flex flex-col gap-y-5">
                  {filteredOrders.length > 0 ? (
                    filteredOrders.map((order) => (
                      <OrderCard key={order._id} order={order} />
                    ))
                  ) : (
                    <div className="col-span-2 text-center py-12">
                      <Typography variant="h6" color="gray">
                        No {value.toLowerCase()} orders found
                      </Typography>
                    </div>
                  )}
                </div>
              </TabPanel>
            ))}
          </TabsBody>
        </Tabs>
      </div>
    </div>
  );
};
