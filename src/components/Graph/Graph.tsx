"use client";

// Style
import "./graph.scss";

// Types
import { CropsType } from "@/types/types.d";

// Components
import Image from "next/image";
import Bar from "@/components/Bar/Bar";

type GraphProps = {
  crops: CropsType[];
  isTiller: boolean;
  isArtisan: boolean;
  compareSeedPrice: boolean;
};

export default function Graph({
  crops,
  isTiller,
  isArtisan,
  compareSeedPrice,
}: GraphProps) {
  /**
   * getHighestPrice
   *
   * @returns {number}
   */
  const getHighestPrice = () => {
    let currentHighestPrice = 0;
    if (crops.length) {
      crops.map((crop) => {
        if (crop.price_wine > currentHighestPrice) {
          currentHighestPrice = crop.price_wine;
        }
        if (isArtisan && ~~(crop.price_wine * 1.4) > currentHighestPrice) {
          currentHighestPrice = ~~(crop.price_wine * 1.4);
        }
        if (crop.price_jelly > currentHighestPrice) {
          currentHighestPrice = crop.price_jelly;
        }
        if (isArtisan && ~~(crop.price_jelly * 1.4) > currentHighestPrice) {
          currentHighestPrice = ~~(crop.price_jelly * 1.4);
        }
        if (crop.price > currentHighestPrice) {
          currentHighestPrice = crop.price;
        }
        if (isTiller && ~~(crop.price * 1.1) > currentHighestPrice) {
          currentHighestPrice = ~~(crop.price * 1.1);
        }
      });
    }

    return currentHighestPrice;
  };

  const highestPrice: number = getHighestPrice();

  return (
    <div className="o-graph">
      <div className="o-graph__data">
        {crops.map((crop) => (
          <div className="o-graph__item" key={crop.id}>
            {/* Stacked bars wrapper */}
            <Bar
              crop={crop}
              highestPrice={highestPrice}
              isTiller={isTiller}
              isArtisan={isArtisan}
              compareSeedPrice={compareSeedPrice}
            />

            {/* Bottom infos */}
            <div className="o-graph__bottom">
              <Image
                src={crop.image}
                alt={crop.name}
                className="o-graph__image"
                width={40}
                height={40}
                priority
              />
              {/* <div className="o-graph__name">{crop.name}</div> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
