"use client";

// Style
import "./tooltip.scss";

// Types
import { CropsType } from "@/types/types.d";

// Components
import Image from "next/image";

type TooltipProps = {
  crop: CropsType;
  isTiller: boolean;
  isArtisan: boolean;
  compareSeedPrice: boolean;
};

export default function Tooltip({
  crop,
  isTiller,
  isArtisan,
  compareSeedPrice,
}: TooltipProps) {
  const isItWorthIt = [
    {
      label: "Vin",
      value: isArtisan ? ~~(crop.price_wine * 1.4) : crop.price_wine + "G",
      worthIt: isArtisan
        ? ~~(crop.price_wine * 1.4) >= crop.price * 2.5
        : crop.price_wine >= crop.price * 2.5,
    },
    {
      label: "Gelée",
      value: isArtisan ? ~~(crop.price_jelly * 1.4) : crop.price_jelly + "G",
      worthIt: isArtisan
        ? ~~(crop.price_jelly * 1.4) >= crop.price * 2
        : crop.price_jelly >= crop.price * 2,
    },
    {
      label: "Revente",
      value: isTiller ? ~~(crop.price * 1.1) : crop.price + "G",
      worthIt: isTiller
        ? ~~(crop.price * 1.1) > crop.seed_price
        : crop.price > crop.seed_price,
    },
  ];

  return (
    <div className="m-tooltip">
      <p className="m-tooltip__title">{crop.name}</p>

      <div className="m-toooltip__specs">
        <p>Prix de la graine : {crop.seed_price}G</p>
        <p>Pousse : {crop.growth_days} jours</p>
      </div>

      <br />

      <div className="m-tooltip__types">
        {isItWorthIt.map((productType) => (
          <div className="m-tooltip__item" key={productType.label}>
            <p>{productType.label}</p>
            <p className="m-tooltip__value">{productType.value}</p>
            {productType.worthIt ? (
              <Image src="/check.png" alt="Check" width={20} height={20} />
            ) : (
              <Image src="/cross.png" alt="Cross" width={20} height={20} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
