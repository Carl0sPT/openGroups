<h1 align="center">Open Groups</h1>
<h3 align="center">How to setup the project</h3>
<h1>Steps</h1>
<p>1. Clone repository.</p>
<p>2. Inside the servidor folder,run <code> pip install -r requirements.txt </code>.</p>
<p>3. Inside the backend folder, run <code>python3 manage.py makemigrations </code> and <code> python3 manage.py migrate </code>.</p>
<p>4. Create an .env with the .env-example variables, with the connection data to the database, in this case PostgreSQL.</p>
<p>5. Inside the fronted folder run <code> npm install</code> to install the dependencies .</p>
<p>6.Finally, to start the backend run <code>python3 manage.py runserver</code>, and for the fronted run <code>npm start</code>.</p>
