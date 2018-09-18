FROM library/postgres

RUN apt-get update
RUN apt-get -y install unzip ruby dos2unix

RUN mkdir /data1
COPY install.sql /data1/
COPY update_csvs.rb /data1/
COPY adventure_works_2014_OLTP_script.zip /data1/
RUN cd /data1 && \
    unzip adventure_works_2014_OLTP_script.zip && \
    rm adventure_works_2014_OLTP_script.zip && \
    ruby update_csvs.rb && \
    rm update_csvs.rb

COPY install.sh /docker-entrypoint-initdb.d/
RUN dos2unix /docker-entrypoint-initdb.d/*.sh