import React from "react";

import Folders from "@data-manager/folders";

const mockItems = [
  {
    id: "id_001",
    title: "title_001"
  },
  {
    id: "id_002",
    title: "title_002",
    image: "https://via.placeholder.com/600",
    secondaryTitle: 'secondary_title_002',
    url: 'https://via.placeholder.com/64',
    description:
      "Doggo ipsum snoot puggorino length boy dat tungg tho, you are doing me a frighten shibe. Vvv thicc corgo very hand that feed shibe borking doggo such treat, corgo shoober stop it fren.",
    avatar: 'https://via.placeholder.com/64',
  }
];

export default function FoldersExample() {
  const handleDelete = React.useCallback((id: string) => {
    console.log('handleDelete:', id);
  }, []);

  return <Folders items={mockItems} onDelete={handleDelete} />;
}
