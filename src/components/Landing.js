import React from 'react';

const Landing = () => (

	<section className="landing container">
		<h1 className="hero-title">Turn the music up!</h1>
		  <section className="selling-points">
			 <div className="point">
			 <img src="/assets/images/network67.png" />
				<h2 className="point-title">Choose your music</h2>
				  <p className="point-description">The world is full of music; why do you have to listen to music somebody else chose?</p>
			  </div>
			  <div className="point">
			  <img src="/assets/images/thumb36.png" />
				  <h2 className="point-title">Unlimited, streaming, ad-free</h2>
				  <p className="point-description">No arbitrary limits, no distractions.</p>
			  </div>
			  <div className="point">
			  <img src="/assets/images/wireless33.png" />
				  <h2 className="point-title">Mobile enabled</h2>
				  <p className="point-description">Listen to your music on the go. This streaming service is available on all mobile platforms.</p>
			  </div>			 
		    </section>				
	</section>	
);

export default Landing;