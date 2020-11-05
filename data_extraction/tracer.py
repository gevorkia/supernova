# python script from data owner

import numpy as np
import h5py
import matplotlib.pyplot as plt
import fornax
from config import options
import mpl_toolkits.mplot3d.axes3d as axes3d
import matplotlib as mpl

mpl.rcParams['font.family'] = 'serif'
mpl.rcParams['font.serif'] =  plt.rcParams['font.serif']
mpl.rcParams['lines.linewidth'] =  '2'
mpl.rcParams['axes.labelsize'] = '12'

sim = fornax.SimulationOutput(options["base.datapath"])
grid = sim.grid()
dirs = list(sim.dumps())

tracer_id = 54466
th=[]
phi=[]
time = []
R = []

fig = plt.figure()
#ax=[plt.subplot(5,1,i+1) for i in range(5)]
#fig.subplots_adjust(hspace=0.135)
for idx in range(184):
  print idx
  infile = h5py.File("../dumps/part_{}.h5part".format(str(idx).zfill(5)),"r")
  X = np.array(infile["Step#0"]["x"][tracer_id])
  Y = np.array(infile["Step#0"]["y"][tracer_id])
  Z = np.array(infile["Step#0"]["z"][tracer_id]) 
  T = np.array(infile["Step#0"]["T_MeV"][tracer_id])
  th.append(np.arctan2(np.sqrt(X**2+Y**2),Z)*180./np.pi)
  phi.append(np.arctan2(Y,X)*180./np.pi)
  rho = np.array(infile["Step#0"]["rho"][tracer_id])
  S = np.array(infile["Step#0"]["entropy"][tracer_id])
  Ye = np.array(infile["Step#0"]["ye"][tracer_id])
  R.append(np.sqrt(X**2+Y**2+Z**2))
  time.append(np.array(infile["Time"])[0])
#plt.plot(np.array(time),np.array(th),'b.')
#plt.plot(np.array(time),np.array(phi),'k.')
plt.plot(np.array(time)[:-1],np.array(R)[:-1]*np.diff(np.array(th))/np.diff(np.array(time)),'bo')
plt.plot(np.array(time[:-1]),np.array(R)[:-1]*np.diff(np.array(phi))/np.diff(np.array(time)),'ko')
#  time_T = np.array([time[0]]*len(T))
  #ax = plt.axes(projection='3d')
  #s = ax.scatter3D(X, Y, Z)
  ax[0].plot(time,np.sqrt(X**2+Y**2+Z**2),'k.')
  ax[1].plot(time,T,'r.')
  ax[2].semilogy(time,rho,'r.')
  ax[3].plot(time,S,'b.')
  ax[4].plot(time,Ye,'g.')
ax[0].set_ylabel(r'R [km]')
ax[0].set_xticks([])
ax[0].set_ylim([0,1500])
ax[1].set_ylabel(r'T [MeV]')
ax[1].set_xticks([])
ax[2].set_ylim([0.0,2.4])
ax[2].set_ylabel(r'$\rho$ [g cm$^{-3}$]')
ax[2].set_xticks([])
ax[2].set_ylim([10**6.8,10**9.7])
ax[3].set_ylabel(r'S [k$_b$/baryon]')
ax[3].set_xticks([])
ax[3].set_ylim([0.0,13])
ax[4].set_ylabel(r'Y$_e$')
ax[4].set_xlabel(r'Time after bounce [s]')
ax[4].set_ylim([0.44,0.505])
ax[1].get_yaxis().set_label_coords(-0.1,0.5)
ax[2].get_yaxis().set_label_coords(-0.1,0.5)
ax[3].get_yaxis().set_label_coords(-0.1,0.5)
ax[4].get_yaxis().set_label_coords(-0.1,0.5)
plt.legend(frameon=False)
plt.savefig('tracer_track.pdf')
  #plt.savefig('tracer_crash/Lum_contour{}'.format(str(idx).zfill(5)),bbox_inches='tight',dpi=300)
plt.close()
