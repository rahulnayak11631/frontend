import React from 'react';

const statisticsCardsData = [
  {
    color: "gray",
    icon: "src/assets/UserPlus.svg",
    title: "Total Enrollments",
    value: "2,300",
    footer: {
      color: "text-green-500",
      value: "+3%",
    },
  },
  {
    color: "gray",
    icon: "src/assets/ChartBar.svg",
    title: "Active Events",
    value: "15",
   
  },
  {
    color: "gray",
    icon: "src/assets/CheckBadge.svg",
    title: "Completed Events",
    value: "150",
    
  },
  {
    color: "gray",
    icon: "src/assets/Banknotes.svg",
    title: "Total Money from Paid Events",
    value: "$103,430",
    
  },
];

const Card = ({ icon, title, value }) => {
    return (
      <div className={`bg-white text-gray p-4 border border-gray-300 mb-5 rounded-lg shadow-md`}>
        <div className="flex items-center">
          <div className="flex-shrink-0 mr-3">
            <img src={icon} className="h-8 w-8" alt={title} />
          </div>
          <div className="flex-grow text-right">
            <p className="text-xs font-medium text-gray-500">{title}</p>
            <p className="text-2xl">{value}</p>
          </div>
        </div>
      </div>
    );
  };
  

const StatisticsCards = () => {
  return (
    <div className="grid grid-cols-4 gap-4">
      {statisticsCardsData.map((card, index) => (
        <Card
          key={index}
          color={card.color}
          icon={card.icon}
          title={card.title}
          value={card.value}
          footer={card.footer}
        />
      ))}
    </div>
  );
};

export default StatisticsCards;
