folder structure

### Client

    └── src                       
      ├── app                       
        ├── assignments/[id]        
          └── page.tsx              # Single Assignment Page          # WORK HERE
        ├── courses        
          ├── [id]   
            └── page.tsx            # Single Course Page              # WORK HERE
          └── page.tsx              # Courses Page                    # WORK HERE
        ├── notes/[id]         
          └── page.tsx              # Single Note Page                # WORK HERE
        ├── schedule         
          └── page.tsx              # Schedule Page                   # WORK HERE
        ├── globals.css             # css file only for classes used globally
        ├── StoreProvider.tsx       # Redux Toolkit Store Provider
        ├── layout.tsx              # App Layout; imports of Nav, Menu; Styling of Layout; import of StoreProvider
        └── page.tsx                # Home Page; imports of all widgets
      ├── components                # folder with all components      # ADD YOUR COMPONENTS HERE
      ├── store                     # redux toolkit store             #I will update this and explain later
      └── types                     # types for the whole application #USE THIS
    └── tailwind.config.ts          # adde colors                     #USE THIS
