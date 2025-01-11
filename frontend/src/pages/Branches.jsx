import React, { useState } from "react";
import { MapPin, Phone, Mail, MapPinned } from "lucide-react";
import {
  Card,
  CardBody,
  CardFooter,
  Button,
  Typography,
} from "@material-tailwind/react";

const BranchesData = [
  {
    name: "Branch 1",
    address: {
      addressLine1: "123 Main Street",
      addressLine2: "New York, NY 10010",
      city: "New York",
      state: "NY",
      zip: "10010",
    },
    phone: "(123) 456-7890",
    email: "info@example.com",
    thumbnail: "https://picsum.photos/400/200?random=1",
    hoverImage: "https://picsum.photos/400/200?random=2",
    locationUrl:
      "https://maps.google.com/?q=123+Main+Street,+New+York,+NY+10010",
  },
  {
    name: "Branch 2",
    address: {
      addressLine1: "456 Elm Avenue",
      addressLine2: "San Francisco, CA 94103",
      city: "San Francisco",
      state: "CA",
      zip: "94103",
    },
    phone: "(987) 654-3210",
    email: "contact@branch2.com",
    thumbnail: "https://picsum.photos/400/200?random=3",
    hoverImage: "https://picsum.photos/400/200?random=4",
    locationUrl:
      "https://maps.google.com/?q=456+Elm+Avenue,+San+Francisco,+CA+94103",
  },
  {
    name: "Branch 3",
    address: {
      addressLine1: "789 Pine Road",
      addressLine2: "Austin, TX 73301",
      city: "Austin",
      state: "TX",
      zip: "73301",
    },
    phone: "(512) 987-6543",
    email: "support@branch3.com",
    thumbnail: "https://picsum.photos/400/200?random=5",
    hoverImage: "https://picsum.photos/400/200?random=6",
    locationUrl: "https://maps.google.com/?q=789+Pine+Road,+Austin,+TX+73301",
  },
  {
    name: "Branch 4",
    address: {
      addressLine1: "321 Oak Street",
      addressLine2: "Chicago, IL 60607",
      city: "Chicago",
      state: "IL",
      zip: "60607",
    },
    phone: "(312) 123-4567",
    email: "hello@branch4.com",
    thumbnail: "https://picsum.photos/400/200?random=7",
    hoverImage: "https://picsum.photos/400/200?random=8",
    locationUrl: "https://maps.google.com/?q=321+Oak+Street,+Chicago,+IL+60607",
  },
  {
    name: "Branch 5",
    address: {
      addressLine1: "555 Maple Drive",
      addressLine2: "Seattle, WA 98101",
      city: "Seattle",
      state: "WA",
      zip: "98101",
    },
    phone: "(206) 555-7890",
    email: "info@branch5.com",
    thumbnail: "https://picsum.photos/400/200?random=9",
    hoverImage: "https://picsum.photos/400/200?random=10",
    locationUrl:
      "https://maps.google.com/?q=555+Maple+Drive,+Seattle,+WA+98101",
  },
];

function BranchCard({ branch }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      className="hover:shadow-xl shadow-blue-50 transform transition-all duration-300 hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Section */}
      <div className="relative h-56 overflow-hidden rounded-t-lg">
        <img
          src={branch.thumbnail}
          alt={branch.name}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isHovered ? "opacity-0" : "opacity-100"
          }`}
        />
        <img
          src={branch.hoverImage}
          alt={`${branch.name} hover`}
          className={`absolute top-0 w-full h-full object-cover transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <Typography
          variant="h5"
          color="white"
          className="absolute bottom-4 left-4 font-bold drop-shadow-lg"
        >
          {branch.name}
        </Typography>
      </div>

      {/* Details Section */}
      <CardBody className="space-y-4">
        {/* Address */}
        <div className="flex items-start space-x-3">
          <MapPin className="w-6 h-6 text-blue-500 flex-shrink-0" />
          <div>
            <Typography
              variant="small"
              color="blue-gray"
              className="font-medium"
            >
              {branch.address.addressLine1}
            </Typography>
            <Typography variant="small" color="blue-gray">
              {branch.address.addressLine2}
            </Typography>
            <Typography variant="small" color="gray" className="text-sm">
              {branch.address.city}, {branch.address.state} {branch.address.zip}
            </Typography>
          </div>
        </div>

        {/* Phone */}
        <div className="flex items-center space-x-3">
          <Phone className="w-6 h-6 text-blue-500" />
          <Typography variant="small" color="blue-gray" className="font-medium">
            {branch.phone}
          </Typography>
        </div>

        {/* Email */}
        <div className="flex items-center space-x-3">
          <Mail className="w-6 h-6 text-blue-500" />
          <Typography variant="small" color="blue-gray" className="font-medium">
            {branch.email}
          </Typography>
        </div>
      </CardBody>

      {/* Footer Section */}
      <CardFooter className="pt-0">
        <Button
          fullWidth
          className="grid place-items-center"
          onClick={() => window.open(branch.locationUrl, "_blank")}
        >
          <div className="flex items-center gap-x-4">
            View Location <MapPinned />
          </div>
        </Button>
      </CardFooter>
    </Card>
  );
}

export default function Branches() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            MBRB Branches
          </h1>
          <p className="text-lg text-gray-600">
            Find your nearest branch and satisfy your sweet cravings
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BranchesData.map((branch, index) => (
            <BranchCard key={index} branch={branch} />
          ))}
        </div>
      </div>
    </div>
  );
}
