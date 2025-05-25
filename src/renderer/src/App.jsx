import { useEffect, useState } from 'react';
import logo from './assets/logo.png';
import PartnerCard from './PartnerCard';
import { useNavigate } from 'react-router-dom';

function App() {
  document.title = 'Список партнеров';
  const navigate = useNavigate();
  const [partners, setPartners] = useState([]);

  useEffect(() => {
    // (async (data="test") => await window.api.foo(data))()
    window.api.getAllPartners().then((data) => setPartners(JSON.parse(data)));
  }, []);

  const handleClick = async () => {
    const reply = JSON.parse(await window.api.poke());
    console.log(reply);
  };

  const redirEditPartner = (partner) => () => {
    navigate('/edit-partner', { state: { partner, action: 'edit' } });
  };

  const redirCreatePartner = () => {
    navigate('/create-partner', { state: { partner: {}, action: 'create' } });
  };

  return (
    <>
      <div className="flex-column">
        <img alt="logo" className="logo" src={logo} />
        <h1>Список партнеров</h1>
        <div className="partner-list">
          <div className="button text-center" onClick={redirCreatePartner}>
            <h3>➕ Добавить нового партнера</h3>
          </div>
          {partners.map((partner) => {
            return (
              <PartnerCard
                partner={partner}
                onClick={redirEditPartner(partner)}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
