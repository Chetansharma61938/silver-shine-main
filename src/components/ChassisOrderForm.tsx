import { forwardRef, useEffect, useState } from "react";
import { formatDate } from "@/utils/date";

interface ChassisOrderFormPdfProps {
  chassisData: any; // Replace `any` with the correct type if you have one
}

const ChassisOrderFormPdf = forwardRef<
  HTMLDivElement,
  ChassisOrderFormPdfProps
>(({ chassisData }, ref) => {
  const [custumerInfo, setCustomerInfo] = useState<any>();

  useEffect(() => {
    const storedData = localStorage.getItem("customerData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setCustomerInfo(parsedData); // Only run once when component mounts
    } else {
      console.log("Error: No customer data found.");
    }
  }, []); // Empty dependency array ensures this only runs once on mount

  // console.log("ChassisOrderFormPdf", chassisData?.bumpersandexterior);

  return (
    <div
      ref={ref}
      className="w-full max-w-7xl mx-auto border border-black text-sm"
    >
      {/* Header Section */}
      <div className="w-full">
        <div className="grid grid-cols-12">
          <div className="col-span-6 border border-black p-1 flex items-center">
            <div className="w-8 h-8 rounded-full bg-red-600 border-2 border-white flex items-center justify-center mr-2">
              <div className="w-5 h-1 bg-white"></div>
            </div>
            <div className="text-base font-bold text-center flex-grow">
              SILVER SHINE CHASSIS ORDER FORM
            </div>
          </div>
          <div className="col-span-2 border border-black bg-yellow-300 p-1 text-center font-bold">
            Order Date:
          </div>
          <div className="col-span-4 border border-black bg-yellow-300 p-1">
            {formatDate(chassisData?.order_informations?.created_at)}
          </div>
        </div>

        <div className="grid grid-cols-12">
          <div className="col-span-6 border border-black p-1"></div>
          <div className="col-span-2 border border-black bg-yellow-300 p-1 text-center font-bold">
            Delivery Date:
          </div>
          <div className="col-span-4 border border-black bg-yellow-300 p-1">
            {formatDate(chassisData?.order_informations?.deliverydate)}
          </div>
        </div>

        <div className="grid grid-cols-12">
          <div className="col-span-2 border border-black p-1 font-bold">
            Customer:
          </div>
          <div className="col-span-4 border border-black p-1 flex items-center justify-center">
            {chassisData?.order_informations?.customer}
          </div>
          <div className="col-span-3 border border-black p-1 font-bold">
            SS Chassis No:
          </div>
          <div className="col-span-3 border border-black p-1">
            {chassisData?.order_informations?.sschassisno}
          </div>
        </div>

        <div className="grid grid-cols-12">
          <div className="col-span-2 border border-black p-1 font-bold">
            Chassis No:
          </div>
          <div className="flex items-center justify-center col-span-4 border border-black p-1 ">
            {chassisData?.order_informations?.chassisno}
          </div>
          <div className="col-span-3 border border-black p-1 font-bold">
            Order by:
          </div>
          <div className="col-span-3 border border-black p-1">
            {chassisData?.order_informations?.orderby}
          </div>
        </div>

        <div className="grid grid-cols-12">
          <div className="col-span-2 border border-black p-1 font-bold">
            Model Name:
          </div>
          <div className="flex items-center justify-center col-span-4 border border-black p-1">
            {chassisData?.order_informations?.modelname}
          </div>
          <div className="col-span-3 border border-black p-1 font-bold">
            Signature:
          </div>
          <div className="col-span-3 border border-black p-1"></div>
        </div>
      </div>

      {/* Main Content - Split into Left and Right */}
      <div className="flex w-full">
        {/* Left Section - Chassis Dimensions */}
        <div className="w-1/2">
          <div className="bg-yellow-300 border border-black p-1 text-center font-bold">
            Chassis Dimensions
          </div>

          <div className="grid grid-cols-3">
            <div className="col-span-1 border border-black p-1 font-bold">
              Chassis Width
            </div>
            <div className="col-span-2 border border-black p-1 flex items-center justify-center">
              {chassisData?.chassisdetails?.chassiswidth}
            </div>
          </div>

          <div className="grid grid-cols-3">
            <div className="col-span-1 border border-black p-1 font-bold">
              Front
            </div>
            <div className="col-span-2 border border-black p-1 flex items-center justify-center">
              {chassisData?.chassisdetails?.chassisfront}
            </div>
          </div>

          <div className="grid grid-cols-3">
            <div className="col-span-1 border border-black p-1 font-bold">
              Wheel Arch
            </div>
            <div className="col-span-2 border border-black p-1 flex items-center justify-center">
              {chassisData?.chassisdetails?.chassiswheelarch}
            </div>
          </div>

          <div className="grid grid-cols-3">
            <div className="col-span-1 border border-black p-1 font-bold">
              Rear
            </div>
            <div className="col-span-2 border border-black p-1 flex items-center justify-center">
              {chassisData?.chassisdetails?.chassisrear}
            </div>
          </div>

          <div className="grid grid-cols-3">
            <div className="col-span-1 border border-black p-1 font-bold">
              Chassis Total length
            </div>
            <div className="col-span-2 border border-black p-1 flex items-center justify-center">
              {chassisData?.chassisdetails?.chassistotallength}
            </div>
          </div>

          <div className="grid grid-cols-4">
            <div className="col-span-1 border border-black p-1 bg-yellow-300 font-bold">
              Overhang
            </div>
            <div className="col-span-1 border border-black p-1 font-bold">
              {chassisData?.chassisdetails?.chassisoverhang}
            </div>
            <div className="col-span-1 border border-black p-1 bg-yellow-300 font-bold">
              Floor Joint
            </div>
            <div className="col-span-1 border border-black p-1 font-bold">
              {chassisData?.chassisdetails?.chassisfloorjoint}
            </div>
          </div>

          <div className="grid grid-cols-3">
            <div className="col-span-3 border border-black p-1 bg-yellow-300 text-center font-bold">
              Step locations
            </div>
          </div>

          <div className="flex justify-center grid grid-cols-3 p-1 text-center font-bold">
            {chassisData?.steplocation?.steplocation}
          </div>

          <div className="grid grid-cols-3">
            <div className="col-span-1 border border-black p-1 font-bold bg-yellow-300">
              STEP SIZE
            </div>
            <div className="col-span-2 border border-black p-1 text-center">
              {chassisData?.steplocation?.stepsize}
            </div>
          </div>

          <div className="grid grid-cols-3">
            <div className="col-span-1 border border-black p-1 font-bold">
              Round corners
            </div>
            <div className="col-span-2 border border-black p-1 text-center">
              {chassisData?.steplocation?.roundedcorners}
            </div>
          </div>

          <div className="grid grid-cols-3">
            <div className="col-span-1 border border-black p-1 font-bold">
              Brackets
            </div>
            <div className="col-span-2 border border-black p-1 text-center">
              {chassisData?.steplocation?.brackets}
            </div>
          </div>

          <div className="grid grid-cols-3">
            <div className="col-span-3 border border-black p-1 bg-yellow-300 text-center font-bold">
              Chassis Frame and A-Frame
            </div>
          </div>

          <div className="grid grid-cols-2">
            <div className="col-span-1 border border-black p-1 text-center font-bold bg-yellow-300">
              Main Rail
            </div>
            <div className="col-span-1 border border-black p-1 text-center font-bold bg-yellow-300">
              A-Frame
            </div>
          </div>

          <div className="grid grid-cols-2">
            <div className="col-span-1 border border-black p-1 text-center">
              {chassisData?.chassiframe?.chassisframemainrail}
            </div>
            <div className="col-span-1 border border-black p-1 text-center">
              {chassisData?.chassiframe?.aframe}
            </div>
          </div>

          <div className="grid grid-cols-3">
            <div className="col-span-1 border border-black p-1 text-center font-bold bg-yellow-300">
              A-Frame Size
            </div>
            <div className="col-span-2 border border-black p-1 text-center font-bold bg-yellow-300">
              BATTERY BOX
            </div>
          </div>

          <div className="grid grid-cols-3">
            <div className="col-span-1 border border-black p-1 text-center">
              {chassisData?.chassiframe?.aframesize}
            </div>
            <div className="col-span-1 border border-black p-1 text-center">
              {chassisData?.chassiframe?.extendedsize}
            </div>
            <div className="col-span-1 border border-black p-1 text-center font-bold">
              FRONT
            </div>
          </div>

          <div className="grid grid-cols-3">
            <div className="col-span-1 border border-black p-1"></div>
            <div className="col-span-1 border border-black p-1"></div>
            <div className="col-span-1 border border-black p-1 text-center">
              {chassisData?.chassiframe?.frontqty}
            </div>
          </div>

          <div className="grid grid-cols-3">
            <div className="col-span-1 border border-black p-1"></div>
            <div className="col-span-1 border border-black p-1"></div>
            <div className="col-span-1 border border-black p-1 text-center font-bold">
              REAR
            </div>
          </div>

          <div className="grid grid-cols-3">
            <div className="col-span-1 border border-black p-1"></div>
            <div className="col-span-1 border border-black p-1"></div>
            <div className="col-span-1 border border-black p-1 text-center">
              {chassisData?.chassiframe?.rearqty}
            </div>
          </div>

          <div className="grid grid-cols-3">
            <div className="col-span-3 border border-black p-1 bg-yellow-300 text-center font-bold">
              Chassis Raiser
            </div>
          </div>

          <div className="grid grid-cols-3">
            <div className="col-span-3 border border-black p-1 text-center">
              {chassisData?.chassiconfiguration?.chassisraiser}
            </div>
          </div>

          <div className="grid grid-cols-3">
            <div className="col-span-3 border border-black p-1 bg-yellow-300 text-center font-bold">
              Coupling Type
            </div>
          </div>

          <div className="grid grid-cols-3">
            <div className="col-span-3 border border-black p-1 text-center">
              {chassisData?.chassiconfiguration?.couplingtype}
            </div>
          </div>

          <div className="grid grid-cols-3">
            <div className="col-span-3 border border-black p-1 bg-yellow-300 text-center font-bold">
              Coupling Position
            </div>
          </div>

          <div className="grid grid-cols-3">
            <div className="col-span-3 border border-black p-1 text-center">
              Top
            </div>
          </div>

          <div className="grid grid-cols-3">
            <div className="col-span-3 border border-black p-1 bg-yellow-300 text-center font-bold">
              Z- Section
            </div>
          </div>

          <div className="grid grid-cols-3">
            <div className="col-span-3 border border-black p-1 text-center">
              {chassisData?.chassiconfiguration?.zsection}
            </div>
          </div>
          <div className="grid grid-cols-3">
            <div className="col-span-3 border border-black p-1 bg-yellow-300 text-center font-bold">
              Suspension type
            </div>
          </div>

          <div className="grid grid-cols-3">
            <div className="col-span-3 border border-black p-1 text-center">
              {chassisData?.suspension?.suspensiontype}
            </div>
          </div>

          <div className="grid grid-cols-3">
            <div className="col-span-3 border border-black p-1 text-center font-bold bg-yellow-300">
              Suspension
            </div>
          </div>

          <div className="grid grid-cols-3">
            <div className="col-span-3 border border-black p-1 text-center font-bold">
              {chassisData?.suspension?.offroadlogo ||
                chassisData?.suspension?.onroadtype}
            </div>
          </div>

          <div className="grid grid-cols-3">
            <div className="col-span-3 border border-black p-1 text-center">
              {chassisData?.suspension?.atmoption}
            </div>
          </div>

          <div className="grid grid-cols-3">
            <div className="col-span-3 border border-black p-1 text-center font-bold bg-yellow-300">
              AXLE
            </div>
          </div>

          <div className="grid grid-cols-3">
            <div className="col-span-3 border border-black p-1 text-center">
              {chassisData?.suspension?.axletype}
            </div>
          </div>

          <div className="grid grid-cols-3">
            <div className="col-span-3 border border-black p-1 text-center font-bold bg-yellow-300">
              Coil Spring
            </div>
          </div>

          <div className="grid grid-cols-3">
            <div className="col-span-3 border border-black p-1 text-center">
              {chassisData?.customsuspension?.coilspring}
            </div>
          </div>

          <div className="grid grid-cols-2">
            <div className="col-span-1 border border-black p-1 text-center font-bold bg-yellow-300">
              AIRBAGS
            </div>
            <div className="col-span-1 border border-black p-1 text-center font-bold bg-yellow-300">
              Brake Type
            </div>
          </div>

          <div className="grid grid-cols-2">
            <div className="col-span-1 border border-black p-1 text-center">
              {chassisData?.customsuspension?.airbags}
            </div>
            <div className="col-span-1 border border-black p-1 text-center">
              {chassisData?.customsuspension?.braketype}
            </div>
          </div>
        </div>

        {/* Right Section - WHEELS AND TYRES */}
        <div className="w-1/2">
          <div className="bg-yellow-300 border border-black p-1 text-center font-bold">
            WHEELS AND TYRES
          </div>

          <div className="grid grid-cols-1">
            <div className="col-span-1 border border-black p-1 text-center">
              {chassisData?.wheelsandtyres?.tyre}
            </div>
          </div>

          <div className="grid grid-cols-3">
            <div className="col-span-1 border border-black p-1 bg-yellow-300 text-center font-bold">
              TYRE SIZE
            </div>
            <div className="col-span-1 border border-black p-1 bg-yellow-300 text-center font-bold">
              WHEEL TYPE
            </div>
            <div className="col-span-1 border border-black p-1 bg-yellow-300 text-center font-bold">
              SPAREWHEEL HOLDER
            </div>
          </div>

          <div className="grid grid-cols-3">
            <div className="col-span-1 border-r border-black p-1"></div>
            <div className="col-span-1 p-1"></div>
            <div className="col-span-1 border border-black p-1 text-center">
              {chassisData?.wheelsandtyres?.noofsparewheel}
            </div>
          </div>

          <div className="grid grid-cols-3">
            <div className="col-span-1 border-r  border-black p-1 text-center">
              {chassisData?.wheelsandtyres?.wheelsize}
            </div>
            <div className="col-span-1  p-1 text-center">
              {chassisData?.wheelsandtyres?.wheeltype}
            </div>
            <div className="col-span-1 border border-black p-1 bg-yellow-300 text-center font-bold">
              SPAREWHEEL POSITION
            </div>
          </div>

          <div className="grid grid-cols-3">
            <div className="col-span-1 border-r border-black p-1"></div>
            <div className="col-span-1 p-1"></div>

            <div className="col-span-1 border border-black  text-center flex flex-col items-center justify-center">
              <div className="text-center flex flex-col items-center justify-center">
                {chassisData?.wheelsandtyres?.sparewheelposition}
              </div>
              <div className="w-full my-2 border-t border-black" />
              <div className="text-center flex flex-col items-center justify-center">
                Front
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1"></div>

          <div className="grid grid-cols-3">
            <div className="col-span-3 border border-black p-1 bg-yellow-300 text-center font-bold">
              BUMPER BARS
            </div>
          </div>

          <div className="grid grid-cols-3">
            <div className="col-span-3 border border-black p-1 text-center">
              {chassisData?.bumpersandexterior?.bumpbars}
            </div>
          </div>

          <div className="grid grid-cols-3">
            <div className="col-span-3 border border-black p-1 bg-yellow-300 text-center font-bold">
              NO. OF ARMS
            </div>
          </div>

          <div className="grid grid-cols-3">
            <div className="col-span-3 border border-black p-1 text-center">
              {chassisData?.bumpersandexterior?.bumperbararms}
            </div>
          </div>

          <div className="grid grid-cols-3">
            <div className="col-span-3 border border-black p-1 bg-yellow-300 text-center font-bold">
              Water Tank & Gas Bottles Holders
            </div>
          </div>

          <div className="grid grid-cols-3">
            <div className="col-span-3 border border-black p-1 text-center font-bold bg-yellow-300">
              WATER TANK QTY
            </div>
          </div>

          <div className="grid grid-cols-3">
            <div className="col-span-1 border border-black p-1 text-center font-bold">
              Front
            </div>
            <div className="col-span-1 border border-black p-1 text-center">
              95L
            </div>
            <div className="col-span-1 border border-black p-1 text-center">
              {chassisData?.tankdetails?.watertankqty.front}
            </div>
          </div>

          <div className="grid grid-cols-3">
            <div className="col-span-1 border border-black p-1 text-center font-bold">
              BETWEEN
            </div>
            <div className="col-span-1 border border-black p-1 text-center">
              95L
            </div>
            <div className="col-span-1 border border-black p-1 text-center">
              {chassisData?.tankdetails?.watertankqty?.between}
            </div>
          </div>

          <div className="grid grid-cols-3">
            <div className="col-span-1 border border-black p-1 text-center font-bold">
              REAR
            </div>
            <div className="col-span-1 border border-black p-1 text-center">
              95L
            </div>
            <div className="col-span-1 border border-black p-1 text-center">
              {chassisData?.tankdetails?.watertankqty?.rear}
            </div>
          </div>

          <div className="grid grid-cols-3">
            <div className="col-span-1 border border-black p-1 text-center font-bold">
              Grey WTank
            </div>
            <div className="col-span-1 border border-black p-1 text-center">
              WTank
            </div>
            <div className="col-span-1 border border-black p-1 text-center">
              {chassisData?.tankdetails?.watertankqty?.grey}
            </div>
          </div>

          <div className="grid grid-cols-3">
            <div className="col-span-3 border border-black p-1 text-center font-bold bg-yellow-300">
              WATER TANK COVERS
            </div>
          </div>
          <div className="grid grid-cols-3">
            <div className="col-span-3 border border-black p-1 text-center">
              {chassisData?.tankdetails?.watertankcover}
            </div>
          </div>

          <div className="grid grid-cols-3">
            <div className="col-span-2 border border-black p-1 text-center font-bold bg-yellow-300">
              GAS HOLDERS
            </div>
            <div className="col-span-1 border border-black p-1 text-center font-bold bg-yellow-300">
              DROP LEGS
            </div>
          </div>

          <div className="grid grid-cols-3">
            <div className="col-span-1 border border-black p-1 text-center font-bold">
              45KG
            </div>
            <div className="col-span-1 border border-black p-1 text-center">
              {chassisData?.tankdetails?.gasholderqty?.kg45}
            </div>
            <div className="col-span-1 border border-black p-1 text-center"></div>
          </div>

          <div className="grid grid-cols-3">
            <div className="col-span-1 border border-black p-1 text-center font-bold">
              9KG
            </div>
            <div className="col-span-1 border border-black p-1 text-center">
              {chassisData?.tankdetails?.gasholderqty?.kg9}
            </div>
            <div className="col-span-1 border border-black p-1 text-center bg-yellow-300 font-bold">
              MUD FLAPS
            </div>
          </div>

          <div className="grid grid-cols-3">
            <div className="col-span-1 border border-black p-1 text-center font-bold">
              Loose
            </div>
            <div className="col-span-1 border border-black p-1 text-center">
              {chassisData?.tankdetails?.gasholderqty?.loose}
            </div>
            <div className="col-span-1 border border-black p-1 text-center">
              1
            </div>
          </div>

          <div className="grid grid-cols-3">
            <div className="col-span-1 border border-black p-1 bg-yellow-300 text-center font-bold">
              JERRY CAN HOLDERS
            </div>
            <div className="col-span-1 border border-black p-1 text-center font-bold">
              QTY
            </div>
            <div className="col-span-1 border border-black p-1 bg-yellow-300 text-center font-bold">
              JOCKEY WHEEL
            </div>
          </div>

          <div className="grid grid-cols-3">
            <div className="col-span-2 border border-black p-1 text-center font-bold bg-yellow-300">
              ELECTRIC JOCKEY WHEEL
            </div>
            <div className="col-span-1 border border-black p-1 text-center">
              8"
            </div>
          </div>

          <div className="grid grid-cols-3">
            <div className="col-span-2 border border-black p-1 text-center">
              YES
            </div>

            <div className="col-span-1 border border-black p-1 text-center font-bold">
              SIDE WINDER
            </div>
          </div>

          <div className="grid grid-cols-3">
            <div className="col-span-2 border border-black p-1 text-center font-bold bg-yellow-300">
              AIRCON FRAME
            </div>
            <div className="col-span-1 border border-black p-1 text-center bg-yellow-300 font-bold">
              MESH
            </div>
          </div>

          <div className="grid grid-cols-3">
            <div className="col-span-2 border border-black p-1 text-center">
              NO
            </div>
            <div className="col-span-1 border border-black p-1 text-center">
              {chassisData?.bumpersandexterior?.mesh}
            </div>
          </div>

          <div className="grid grid-cols-3">
            <div className="col-span-3 border border-black p-1 bg-yellow-300 text-center font-bold">
              {chassisData?.bumpersandexterior?.airconframe}
            </div>
          </div>

          <div className="grid grid-cols-3">
            <div className="col-span-1 border border-black p-1 text-center font-bold bg-yellow-300">
              Nudge Bar
            </div>
            <div className="col-span-1 border border-black p-1 text-center font-bold bg-yellow-300">
              Recovery Points
            </div>
            <div className="col-span-1 border border-black p-1 text-center font-bold bg-yellow-300">
              Paint Colour
            </div>
          </div>

          <div className="grid grid-cols-3">
            <div className="col-span-1 border border-black p-1 text-center">
              {chassisData?.extrasdetails?.nudgebar}
            </div>
            <div className="col-span-1 border border-black p-1 text-center">
              {chassisData?.extrasdetails?.recoverypoints}
            </div>
            <div className="col-span-1 border border-black p-1 text-center rowspan-3">
              {chassisData?.extrasdetails?.paintcolour}
            </div>
          </div>

          <div className="grid grid-cols-3">
            <div className="col-span-1 border border-black p-1 text-center font-bold  bg-yellow-300">
              Skid Plates
            </div>
            <div className="col-span-1 border border-black p-1 text-center font-bold  bg-yellow-300">
              Bike Plate
            </div>
            <div className="col-span-1 border border-black p-1"></div>
          </div>

          <div className="grid grid-cols-3">
            <div className="col-span-1 border border-black p-1 text-center">
              {chassisData?.extrasdetails?.skidplates}
            </div>
            <div className="col-span-1 border border-black p-1">
              {chassisData?.extrasdetails?.bikeplate}
            </div>
            <div className="col-span-1 border border-black p-1"></div>
          </div>

          <div className="grid grid-cols-3">
            <div className="col-span-1 border border-black p-1 text-center font-bold bg-yellow-300">
              Wheel Brace
            </div>
            <div className="col-span-1 border border-black p-1 text-center font-bold bg-yellow-300">
              Jack
            </div>
            <div className="col-span-1 border border-black p-1 font-bold bg-yellow-300">
              COATING TYPE
            </div>
          </div>

          <div className="grid grid-cols-3">
            <div className="col-span-1 border border-black p-1 text-center">
              {chassisData?.extrasdetails?.wheelbrace}
            </div>
            <div className="col-span-1 border border-black p-1 text-center">
              {chassisData?.extrasdetails?.jack2000}
            </div>
            <div className="col-span-1 border border-black p-1">
              {chassisData?.extrasdetails?.coatingtype}
            </div>
          </div>

          <div className="grid grid-cols-3">
            <div className="col-span-1 border border-black p-1 text-center font-bold text-red-600">
              Phone
            </div>
            <div className="col-span-2 border border-black p-1">
              {custumerInfo?.phone}
            </div>
          </div>

          <div className="grid grid-cols-3">
            <div className="col-span-1 border border-black p-1 text-center font-bold text-red-600">
              Email
            </div>
            <div className="col-span-2 border border-black p-1">
              {custumerInfo?.email}
            </div>
          </div>

          <div className="grid grid-cols-3">
            <div className="col-span-1 border border-black p-1 text-center font-bold text-red-600">
              Address
            </div>
            <div className="col-span-2 border border-black p-1">
              {custumerInfo?.address}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="w-full">
        <div className="grid grid-cols-12">
          <div className="col-span-2 border border-black p-1 text-red-600 font-bold">
            COMMENTS
          </div>
          <div className="col-span-10 border border-black p-1"></div>
        </div>

        <div className="grid grid-cols-1">
          <div className="col-span-1 border border-black p-1 h-8"></div>
        </div>

        <div className="grid grid-cols-1">
          <div className="col-span-1 border border-black p-1 text-center text-red-600 text-xs">
            Note: All the chassis are manufactured according to specifications
            provided by customer in this form.
          </div>
        </div>

        <div className="grid grid-cols-1">
          <div className="col-span-1 border border-black p-1 text-center text-red-600 text-xs">
            Silvershine chassis will not be responsible for any deviation after
            order get processed.
          </div>
        </div>
      </div>
    </div>
  );
});
ChassisOrderFormPdf.displayName = "ChassisOrderFormPdf";

export default ChassisOrderFormPdf;
