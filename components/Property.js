import Link from "next/link";
import Image from "next/image";
import { Box, Button, Flex, Spacer, Text, Tooltip } from "@chakra-ui/react";
import { FaBed, FaBath } from "react-icons/fa";
import { BsGridFill } from "react-icons/bs";
import millify from "millify";
import { GoVerified, GoQuestion } from "react-icons/go";
import { useState, useEffect } from "react";

import DefaultImage from "../assets/images/home.png";
import { geoOptions, fetchGeoSearch } from "../utils/geoSearch";
import { registeredOptions, fetchOpenApi } from "../utils/hpdViolations";

/**
 * @returns a reusable component that is used to display a specific property listing "card"
 */
const Property = ({ property, isRental }) => {
  //the specific zillow property gets passed in props so we destructure the individual listing
  //this contains things such as the image, price, id of the apartment (known as zpid or zillow property id)
  // console.log("PROPERTY DETAILS:\n", property)
  const { zpid, address, imgSrc, price, bedrooms, bathrooms, livingArea } =
    property;
  //console.log(zpid, address, imgSrc)

  const [isVerified, setVerified] = useState([]);

  let addressSplit = address.split(",");

  if (addressSplit.length < 4) {
    addressSplit = [""].concat(addressSplit);
  }

  //dealing with plurality depending on # of beds and baths
  let bedWord = "Beds";

  if (bedrooms == 1) {
    bedWord = "Bed";
  }

  let bathWord = "Baths";

  if (bathrooms == 1) {
    bathWord = "Bath";
  }

  //console.log(addressSplit)

  let [residentalName, streetName, city, stateAndZip] = addressSplit;
  streetName = streetName.toUpperCase();
  const removeTerms = ["APT", "#", "FLOOR", "PENTHOUSE", "TOWNHOUSE"];
  for (let term of removeTerms) {
    if (streetName.includes(term)) {
      streetName = streetName.substring(0, streetName.indexOf(term) - 1);
    }
  }
  //console.log('STREET NAME:', streetName)

  const fullLoc = `${streetName} ${stateAndZip.trim().substring(3)}`;

  useEffect(() => {
    const options = geoOptions(fullLoc);
    fetchGeoSearch(options)
      .then((response) => {
        const geoSearchProps = response.features[0]?.properties;
        // console.log(fullLoc);
        // console.log(geoSearchProps);
        return geoSearchProps;
      })
      .then((geoSearchProps) => {
        //console.log(geoSearchProps)
        if (geoSearchProps) {
          let options = (options = registeredOptions(
            geoSearchProps.pad_orig_stname,
            undefined,
            geoSearchProps.pad_low
          ));
          fetchOpenApi(options).then((response) => {
            if (response.length === 0) {
              options = registeredOptions(
                geoSearchProps.pad_orig_stname,
                geoSearchProps.housenumber
              );
              fetchOpenApi(options).then((response) => {
                setVerified(response);
              });
            } else {
              setVerified(response);
            }
          });
        } else {
          setVerified([]);
        }
      });
  }, []);

  //console.log(isVerified)

  return (
    //after clicking on a property we route to the specific property page
    //for new tab <a target="_blank" rel="noreferrer"></a>
    <Link href={`/property/${zpid}/`} passHref>
      <Flex
        flexWrap="wrap"
        w="420px"
        p="5"
        paddingTop="0px"
        justifyContent="flex-start"
        cursor="pointer"
      >
        <Box>
          <Image
            src={imgSrc ? imgSrc : DefaultImage}
            alt="home"
            width={400}
            height={260}
          />
        </Box>
        <Box w="full">
          <Flex
            paddingTop="2"
            alignItems="center"
            justifyContent="space-between"
          >
            <Flex alignItems="center">
              <Text fontWeight="bold" fontSize="lg">
                ${price.toLocaleString("en-US")}
                {isRental ? "/mo" : ""}
              </Text>
            </Flex>
            <Flex>
              <Text
                fontWeight="bold"
                fontSize="lg"
                color={isVerified.length > 0 ? "teal.400" : "red.400"}
              >
                {isVerified.length > 0 ? "HPD Verified" : "Not Verified"}
              </Text>
              <Box
                paddingLeft="2"
                paddingTop="0"
                _hover={{ color: "teal.600" }}
                color={isVerified.length > 0 ? "green.500" : "gray.500"}
              >
                {isVerified.length > 0 ? (
                  <GoVerified />
                ) : (
                  <Link href="/notregistered" passHref>
                    <Text fontSize="xs">Learn More</Text>
                  </Link>
                )}
              </Box>
            </Flex>
          </Flex>
          <Flex
            alignItems="center"
            p="1"
            justifyContent="space-between"
            w="260px"
            color="blue.400"
          >
            <FaBed /> {bedrooms} {bedWord} | <FaBath /> {bathrooms} {bathWord} |{" "}
            <BsGridFill /> {millify(livingArea)} sqft
          </Flex>
          <Text fontSize="md" color="gray.700">
            {residentalName} {streetName}
            <br />
            {city}, {stateAndZip}
          </Text>
        </Box>
      </Flex>
    </Link>
  );
};

export default Property;
