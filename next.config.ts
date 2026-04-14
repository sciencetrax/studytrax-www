import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return [
      { source: "/studytraxredcap", destination: "/compare-to-redcap", permanent: true },
      { source: "/features", destination: "/", permanent: true },
      { source: "/clinicaltrials", destination: "/", permanent: true },
      { source: "/patientregistries", destination: "/", permanent: true },
      { source: "/learninghealthnetworks", destination: "/", permanent: true },
      { source: "/epilepsy", destination: "/", permanent: true },
      { source: "/new-release", destination: "/", permanent: true },
      { source: "/security", destination: "/compliance-trust", permanent: true },
      { source: "/support", destination: "/contact", permanent: true },
      { source: "/blog", destination: "/", permanent: true },
      { source: "/studytraxiamrarecomparison", destination: "/", permanent: true },
      { source: "/switchregistration", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
