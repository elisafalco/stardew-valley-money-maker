"use client";

import { useState } from "react";

// Style
import "./homepage.scss";

// Types
import { CropsType } from "@/types/types.d";

// Components
import Image from "next/image";
import Checkbox from "@/components/Checkbox/Checkbox";
import Legend from "@/components/Legend/Legend";

import Graph from "@/components/Graph/Graph";

// Data
import cropsData from "../data/crops.json";

export default function Home() {
  // Variables
  const defaultFilters = [
    { name: "spring", label: "Printemps", value: true },
    { name: "summer", label: "Été", value: true },
    { name: "fall", label: "Automne", value: true },
    { name: "winter", label: "Hiver", value: true },
  ];
  const defaultPriceSettings = [
    { name: "tiller", label: "Cultivateur", value: true },
    { name: "artisan", label: "Artisan", value: false },
    { name: "compareSeedPrice", label: "Comp. prix graine", value: false },
  ];

  // Hooks
  const [filters, setFilters] = useState(defaultFilters);
  const [priceSettings, setPriceSettings] = useState(defaultPriceSettings);

  /**
   * handleFilterChange
   *
   * @param filterName
   */
  const handleFilterChange = (filterName: string) => {
    // Map on filter to change only one
    setFilters(
      filters.map((filter) => {
        if (filter.name === filterName) {
          return {
            ...filter,
            value: !filter.value,
          };
        }
        return filter;
      })
    );
  };

  /**
   * handleSettingChange
   *
   * @param settingName
   */
  const handleSettingChange = (settingName: string) => {
    // Map on filter to change only one
    setPriceSettings(
      priceSettings.map((setting) => {
        if (setting.name === settingName) {
          return {
            ...setting,
            value: !setting.value,
          };
        }
        return setting;
      })
    );
  };

  /**
   * getFilteredCrops
   */
  const getFilteredCrops = () => {
    const activeFilters = filters.map((filter) => {
      if (filter.value) {
        return filter.name;
      }

      return null;
    });

    return cropsData.filter((cropData) =>
      cropData.seasons.some((cropSeason) => activeFilters.includes(cropSeason))
    );
  };

  const filteredCrops: CropsType[] = getFilteredCrops();

  return (
    <main className="l-main">
      {/* <Image
        src="/logo.png"
        alt="Stardew Valley Logo"
        width={200}
        height={100}
        priority
      /> */}

      <div className="o-content">
        <div className="o-filters">
          {filters.map((filter, index) => (
            <div key={index}>
              <Checkbox
                id={filter.name}
                name={filter.name}
                label={filter.label}
                checked={filter.value}
                onChange={() => handleFilterChange(filter.name)}
              />
            </div>
          ))}
          <span className="o-filters__separator" />
          {priceSettings.map((setting, index) => (
            <div key={index}>
              <Checkbox
                id={setting.name}
                name={setting.name}
                label={setting.label}
                checked={setting.value}
                onChange={() => handleSettingChange(setting.name)}
              />
            </div>
          ))}

          <Legend />
        </div>

        <Graph
          crops={filteredCrops}
          isTiller={priceSettings[0].value}
          isArtisan={priceSettings[1].value}
          compareSeedPrice={priceSettings[2].value}
        />
      </div>

      <div className="a-chicken">
        <Image
          src="/chicken.png"
          alt="Just a chicken"
          title="Côt côt"
          width={50}
          height={50}
        />
      </div>
    </main>
  );
}
