FROM python:3.8

WORKDIR /app/backend

COPY requirements.txt /app/backend/
RUN pip install -r requirements.txt

COPY . /app/backend/

EXPOSE 8000
# define the default command to run when starting the container
CMD ["gunicorn", "--chdir", "backend", "--bind", ":8000", "backend.wsgi:application"]