import React from 'react';

const Landing = () => (

	<section className="landing container">
		<h1 className="hero-title">Turn the music up!</h1>
		  <section className="selling-points row">
			 <div className="point col">
				<h2 className="point-title col"><img src="/assets/images/network67.png" />Choose your music</h2>
				  <p className="point-description col">The world is full of music; why do you have to listen to music somebody else chose?</p>
			  </div>
			  <div className="point col">
				  <h2 className="point-title col"><img src="/assets/images/thumb36.png" />Unlimited, streaming, ad-free</h2>
				  <p className="point-description col">No arbitrary limits, no distractions.</p>
			  </div>
			  <div className="point col">
				  <h2 className="point-title col"><img src="/assets/images/wireless33.png" />Mobile enabled</h2>
				  <p className="point-description col">Listen to your music on the go. This streaming service is available on all mobile platforms.</p>
			  </div>			 
		    </section>				
	</section>	
);

export default Landing;