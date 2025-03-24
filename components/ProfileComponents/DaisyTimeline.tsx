import React from "react";

const DaisyTimeline = () => {
  return (
    <ul className="timeline timeline-vertical">
      {/* Timeline Item 1 */}
      <li className="relative">
        <hr className="absolute left-0 h-full border-l-2 border-gray-300" />
        <div className="timeline-end bg-white pl-10">Ordered</div>
      </li>

      {/* Timeline Item 2 */}
      <li className="relative">
        <hr className="absolute left-0 h-full border-l-2 border-gray-300" />
        <div className="timeline-end pl-10">Processing</div>
      </li>

      {/* Timeline Item 3 */}
      <li className="relative">
        <hr className="absolute left-0 h-full border-l-2 border-gray-300" />
        <div className="timeline-end pl-10">Shipped</div>
      </li>

      {/* Timeline Item 4 */}
      <li className="relative">
        <hr className="absolute left-0 h-full border-l-2 border-gray-300" />
        <div className="timeline-end pl-10">Estimated Delivery</div>
      </li>
    </ul>
  );
};

export default DaisyTimeline;
