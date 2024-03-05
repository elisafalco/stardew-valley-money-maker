"use client";

import { useState } from "react";

// Types
import { CropsType } from "@/types/types.d";

// Components
import Tooltip from "@/components/Tooltip/Tooltip";

type BarProps = {
  crop: CropsType;
  highestPrice: number;
  isTiller: boolean;
  isArtisan: boolean;
  compareSeedPrice: boolean;
};

export default function Bar({
  crop,
  highestPrice,
  isTiller,
  isArtisan,
  compareSeedPrice,
}: BarProps) {
  // Hooks
  const [showTooltip, setShowTooltip] = useState(false);

  /**
   * getBarHeight
   *
   * @param price
   * @returns {string}
   */
  const getBarHeight = (price: number) => {
    return `calc(16px + ${(price / highestPrice) * 100}%)`;
  };

  return (
    <div
      className="o-graph__bars"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {showTooltip === true && (
        <Tooltip
          crop={crop}
          isTiller={isTiller}
          isArtisan={isArtisan}
          compareSeedPrice={compareSeedPrice}
        />
      )}

      {/* Price wine */}
      {crop.price_wine > 0 && isArtisan && (
        <div
          style={{ height: getBarHeight(~~crop.price_wine * 1.4) }}
          className="o-graph__bar -wine"
        >
          <div className="o-graph__amount">{~~(crop.price_wine * 1.4)}</div>
        </div>
      )}
      {crop.price_wine > 0 && !isArtisan && (
        <div
          style={{ height: getBarHeight(crop.price_wine) }}
          className="o-graph__bar -wine"
        >
          <div className="o-graph__amount">{crop.price_wine}</div>
        </div>
      )}

      {/* Price jelly */}
      {crop.price_jelly > 0 && isArtisan && (
        <div
          style={{ height: getBarHeight(~~(crop.price_jelly * 1.4)) }}
          className="o-graph__bar -jelly"
        >
          <div className="o-graph__amount">{~~(crop.price_jelly * 1.4)}</div>
        </div>
      )}
      {crop.price_jelly > 0 && !isArtisan && (
        <div
          style={{ height: getBarHeight(crop.price_jelly) }}
          className="o-graph__bar -jelly"
        >
          <div className="o-graph__amount">{crop.price_jelly}</div>
        </div>
      )}

      {/* Price */}
      {isTiller ? (
        <div
          style={{ height: getBarHeight(~~(crop.price * 1.1)) }}
          className="o-graph__bar"
        >
          <div className="o-graph__amount">{~~(crop.price * 1.1)}</div>
        </div>
      ) : (
        <div
          style={{ height: getBarHeight(crop.price) }}
          className="o-graph__bar"
        >
          <div className="o-graph__amount">{crop.price}</div>
        </div>
      )}

      {/* Seed price */}
      {compareSeedPrice && crop.seed_price > 0 && (
      <div
        style={{ height: getBarHeight(crop.seed_price) }}
        className="o-graph__bar -seed"
      >
        <div className="o-graph__amount">{crop.seed_price}</div>
      </div>
    )}
    </div>
  );
}
