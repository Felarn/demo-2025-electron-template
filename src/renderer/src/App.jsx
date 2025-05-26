import { useEffect, useState } from 'react';
import logo from './assets/logo.png';
import PartnerCard from './PartnerCard';
import { useNavigate } from 'react-router-dom';

function App() {
  document.title = 'Список партнеров';
  const navigate = useNavigate();
  const [partners, setPartners] = useState([]);

  useEffect(() => {
    window.api.getAllPartners().then(setPartners);
  }, []);

  const redirEditPartner = (partner) => () => {
    navigate('/edit-partner', { state: { partner, action: 'edit' } });
  };

  const redirCreatePartner = () => {
    navigate('/create-partner', { state: { partner: {}, action: 'create' } });
  };

  const handleDeletePartner = (partner) => (e)=>{
    e.stopPropagation();
    window.api.deletePartner(partner).then(window.api.getAllPartners().then(setPartners));
  }

  return (
    <>
      <div className="flex-column">
        <img alt="logo" className="logo" src={logo} />
        <h1>Список партнеров</h1>
        <div className="partner-list frame">
          <div className="button text-center" onClick={redirCreatePartner} >
            <h3>➕ Добавить нового партнера</h3>
          </div>
          {partners.map((partner) => {
            return (
              <PartnerCard
                partner={partner}
                onClick={redirEditPartner(partner)}
                onDelete={handleDeletePartner}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
