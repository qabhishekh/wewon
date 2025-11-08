import PercentileConverter from '@/components/Converter/PercentileConverter';
import MainHeading from '@/components/sections/MainHeading';
import Recommended from '@/components/sections/Recommended';
import React from 'react';

const page = () => {
  return (
    <>
    <div className="container mx-auto mb-8 px-4">
      <MainHeading top="Percentile Converter" bottom="Convert Your Percentile to Percentage Easily" />
    </div>
    <div>
      <PercentileConverter />
    </div>
    <div className="mb-16 container mx-auto px-4">
        <Recommended />
      </div>
    </>
  );
}

export default page;
