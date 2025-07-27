// components/DayColumn.tsx
"use client";

import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

interface OptionItem {
  name: string;
  type: 'spot' | 'meal';
  googleMapUrl?: string;
  instagramUrl?: string;
}

interface SlotData {
  slotType: string;
  options: OptionItem[];
}

interface Props {
  tripId: string;
  date: string;
  mode: 'timeline' | 'point-only';
}

export const DayColumn: React.FC<Props> = ({ tripId, date, mode }) => {
  const [slots, setSlots] = useState<SlotData[]>([]);

  useEffect(() => {
    const fetchSlots = async () => {
      const ref = collection(db, `trips/${tripId}/days/${date}/slots`);
      const snapshot = await getDocs(ref);
      const data = snapshot.docs.map(doc => doc.data() as SlotData);
      setSlots(data);
    };
    fetchSlots();
  }, [tripId, date]);

  if (mode === 'point-only') {
    return (
      <div className="space-y-4">
        <div className="p-4 bg-white rounded shadow">早餐：尚未設定</div>
        <div className="p-4 bg-white rounded shadow">午餐：尚未設定</div>
        <div className="p-4 bg-white rounded shadow">晚餐：尚未設定</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {slots.map((slot) => (
        <div key={slot.slotType} className="p-4 bg-white rounded shadow">
          <h3 className="font-semibold text-lg capitalize mb-2">{slot.slotType}</h3>
          <ul className="list-disc pl-5 space-y-1">
            {slot.options.map((opt, i) => (
              <li key={i}>
                <span className="font-medium">{opt.name}</span>
                {opt.googleMapUrl && (
                  <a href={opt.googleMapUrl} target="_blank" rel="noopener" className="text-blue-500 ml-2">地圖</a>
                )}
                {opt.instagramUrl && (
                  <a href={opt.instagramUrl} target="_blank" rel="noopener" className="text-pink-500 ml-2">IG</a>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};
