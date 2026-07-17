from app.core.database import base, engine
from app.users.models import User

print("Creating tables...")
base.metadata.create_all(bind=engine)
print("✅ Tables created successfully")