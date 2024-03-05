import "./legend.scss";

export default function Legend() {
  return (
    <div className="o-legend">
      <div className="o-legend__item">
        <div className="o-legend__color -purple"></div>
        <div className="o-legend__label">Prix du vin (4-7 jours)</div>
      </div>
      <div className="o-legend__item">
        <div className="o-legend__color -pink"></div>
        <div className="o-legend__label">Prix de la gelée (2-3 jours)</div>
      </div>
      <div className="o-legend__item">
        <div className="o-legend__color -blue"></div>
        <div className="o-legend__label">Prix de vente</div>
      </div>
      <div className="o-legend__item">
        <div className="o-legend__color -mediumBlue"></div>
        <div className="o-legend__label">Coût de la graine</div>
      </div>
    </div>
  );
}
