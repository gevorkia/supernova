import numpy as np
import h5py 
# h5py is python wrapper for hdf5 files

infile=h5py.File("../data/hdf5/part_00500.h5part", "r")

T = np.array(infile["Step#0"]["T_MeV"])
x = np.array(infile["Step#0"]["x"])
y = np.array(infile["Step#0"]["y"])
entropy = np.array(infile["Step#0"]["entropy"])

# export as text file with columns of x, y, T, entropy
np.savetxt("star_00500.txt", np.c_[x,y,T,entropy])  

Input = np.loadtxt("star_00500.txt")
# raw data file => 0-last index of X, then Y, then T
x=Input[:,0]   # all rows, index 0
y=Input[:,1]
t=Input[:,2]
entropy=Input[:,3]

# data_extraction % python ./star_hdf5_extractor.py

# need to delimit w commas
# 1. VSC find & replace all spaces with a comma (no space)
# 2. Vim filename.txt
    # type : then paste %s/ /,/g 
    # :q to exit

# https://shancarter.github.io/mr-data-converter/
# x,y,T,entropy <= add this for first row
# 4.240041198730468750e+02,3.193525878906250000e+03,2.540372014045715332e-01,3.313353061676025391e+00, etc
# output as => JSON - properties
# settings: delimiter = comma

# print x.shape  # (24968,)
# print x.min()  # 0 km
# print x.max()  # 99631 km  (position boundaries, outside and inside per "cell in grid")

# print y.shape  # (24968,)
# print y.min()  # 0 km 
# print y.max() 

# 2D data => sphere math

# print T.shape # (24968,)
# print T.min() # 0.0
# print T.max() # 82.211

# print entropy.shape # (24968,)
# print entropy.min() # 0.0
# print entropy.max() # 78.898285



# 1 MB per file (1 ms in time), 4 seconds total => 4GB data, 4000 files
# ~25k rows aka snapshots of the star 

# x, y, T each have 25000 values (positions). 
# each pos has temp (mega electron volts => convertable), entropy, etc

# 3.1MB for 1 ms  of data = 24,967 POJOs (stored in an array)
# Total 4000ms of data available equates to ~ 12.4 GB

# 4s of data sampling starts when core collapses. 
# data sampled is the last ms of the explosion simulation
# 4s starts after core-bounce, which sets t=0
# The shock propagates spherically initially, but then quickly becomes aspherical
# You can see the shock boundary here, at ~50,000 km


# MacBook-Pro:Downloads lili$ h5ls part_04354.h5part
# Step#0                   Group
# Time                     Dataset {1}
# MacBook-Pro:Downloads lili$ h5ls part_04354.h5part/Step#0
# T_MeV                    Dataset {24968}
# active                   Dataset {24968}
# entropy                  Dataset {24968}
# id                       Dataset {24968}
# mass                     Dataset {24968}
# rho                      Dataset {24968}
# x                        Dataset {24968}
# y                        Dataset {24968}
# ye                       Dataset {24968}
# MacBook-Pro:Downloads lili$ h5ls part_04354.h5part/Group
# Group      **NOT FOUND** MacBook-Pro:Downloads lili$ h5ls part_04354.h5part/Time
# Time                     Dataset {1}
# MacBook-Pro:Downloads lili$ h5ls -d part_04354.h5part/Time
# Time                     Dataset {1}
#     Data:
#          4.35399999999979
# MacBook-Pro:Downloads lili$ h5ls -d part_04354.h5part/Step#0/T_MeV
# T_MeV                    Dataset {24968}
