# vortex-mp3-player


  This is my first react native project and the biggest project i have made so far, 
            making this app i learn a lot about optimization and avoiding memory leaks, there are a couple problems with this app
            that i have found which i just cannot fix yet, one being that getting track metadata takes a long time, i read this is due to the react native
            bridge so that is unavoidable at the moment, the library i used has a batch reciever but it is not working at this moment in time.
            
            
             Untill this is fixed i used async storage to store the metadata into storage after first launch to solve this problem,
             this makes a much faster load but comes with the problem of the user having to rescan everytime they add media to their mobile, i
             hope to get this problem fixed in the future.
             
             Problem 2 is even worse i think and i have no idea why this is happening, everytime the image metadata is taken from the mp3 file
             it doubles the image size on the phone, i have tested this on a few emulators and doesnt happen on them all oreo seems to be the main 
             one and it happens on my mobile which is oreo too, 
             i am trying to find a library that can delete files from root storage to fix this problem but have not found one so far.
